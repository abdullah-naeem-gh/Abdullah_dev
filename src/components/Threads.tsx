import React, { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

// Extended types to handle OGL's specific needs
type OGLRenderingContext = WebGLRenderingContext & {
  renderer?: Renderer;
  canvas: HTMLCanvasElement;
};

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
  position?: "fixed" | "absolute" | "relative";
  zIndex?: number;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Simplified shader that focuses on reliable compilation
const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

// Helper function for simplified noise - defined BEFORE first usage
vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
}

// Simplified noise function that's more reliable for WebGL
float simplenoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    vec2 u = f * f * (3.0 - 2.0 * f); // Smoothstep
    
    // Sample the four corners
    float a = dot(hash2(i), f);
    float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
    
    // Interpolate and scale to -1,1
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
}

float pixel(float count, vec2 resolution) {
    return (1.0 / min(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                          * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    // Using simplenoise instead of Perlin2D
    float xnoise = mix(
        simplenoise(vec2(time_scaled, st.x + perc) * 2.5),
        simplenoise(vec2(time_scaled, st.x + time_scaled) * 3.5) * st.x,
        0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise * finalAmplitude;

    float line_start = smoothstep(
        y + (width + (u_line_blur * pixel(1.0, iResolution.xy) * blur)),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width + (u_line_blur * pixel(1.0, iResolution.xy) * blur)),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const Threads: React.FC<ThreadsProps> = ({
  color = [1, 0.2, 0.2],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  className = "",
  position = "fixed",
  zIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const errorRef = useRef<string | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const contextRestoreAttempts = useRef(0);
  const maxRestoreAttempts = 3;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let renderer: Renderer | null = null;
    let gl: OGLRenderingContext | null = null;
    let mesh: Mesh | null = null;
    let program: Program | null = null;
    
    // Handle context loss
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.log("WebGL context lost");
      setContextLost(true);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
    };
    
    // Handle context restoration
    const handleContextRestored = () => {
      console.log("WebGL context restored");
      setContextLost(false);
      
      // Only attempt to restore a limited number of times
      if (contextRestoreAttempts.current < maxRestoreAttempts) {
        contextRestoreAttempts.current++;
        // Wait a bit before reinitializing
        setTimeout(initializeWebGL, 500);
      } else {
        errorRef.current = "Too many WebGL context loss events. Rendering disabled.";
      }
    };

    // Mouse position tracking
    const mousePosition = {
      current: [0.5, 0.5],
      target: [0.5, 0.5]
    };
    
    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePosition.target = [x, y];
    }
    
    function handleMouseLeave() {
      mousePosition.target = [0.5, 0.5];
    }
    
    // Add mouse event listeners
    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initialize WebGL setup
    function initializeWebGL() {
      try {
        // Clean up previous instance if exists
        if (gl && gl.canvas && container.contains(gl.canvas as Node)) {
          container.removeChild(gl.canvas as Node);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }

        renderer = new Renderer({ alpha: true });
        gl = renderer.gl as OGLRenderingContext;
        
        // Add event listeners for context handling
        if (gl.canvas instanceof HTMLCanvasElement) {
          gl.canvas.addEventListener('webglcontextlost', handleContextLost);
          gl.canvas.addEventListener('webglcontextrestored', handleContextRestored);
        }
        
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        // Append canvas - with type assertion for safety
        if (gl.canvas instanceof HTMLCanvasElement) {
          container.appendChild(gl.canvas);
        }

        const geometry = new Triangle(gl);

        try {
          program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
              iTime: { value: 0 },
              iResolution: {
                value: new Color(
                  gl.canvas.width,
                  gl.canvas.height,
                  gl.canvas.width / gl.canvas.height
                ),
              },
              uColor: { value: new Color(...color) },
              uAmplitude: { value: amplitude },
              uDistance: { value: distance },
              uMouse: { value: new Float32Array([0.5, 0.5]) },
            },
          });
        } catch (err) {
          console.error("Failed to compile shader program:", err);
          errorRef.current = `Shader program creation failed: ${err}`;
          return;
        }

        mesh = new Mesh(gl, { geometry, program });
        resize();
        
        // Start animation loop
        animationFrameId.current = requestAnimationFrame(update);
      } catch (err) {
        console.error("WebGL initialization failed:", err);
        errorRef.current = `WebGL initialization failed: ${err}`;
      }
    }

    function resize() {
      if (!renderer || !program || !gl) return;
      
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      
      if (program.uniforms && program.uniforms.iResolution) {
        program.uniforms.iResolution.value.r = clientWidth;
        program.uniforms.iResolution.value.g = clientHeight;
        program.uniforms.iResolution.value.b = clientWidth / clientHeight;
      }
    }
    
    window.addEventListener("resize", resize);

    function update(t: number) {
      if (!program || !mesh || !renderer || !program.uniforms) {
        console.error("Required WebGL objects are undefined");
        return;
      }

      if (enableMouseInteraction) {
        const smoothing = 0.05;
        mousePosition.current[0] += smoothing * (mousePosition.target[0] - mousePosition.current[0]);
        mousePosition.current[1] += smoothing * (mousePosition.target[1] - mousePosition.current[1]);
        program.uniforms.uMouse.value[0] = mousePosition.current[0];
        program.uniforms.uMouse.value[1] = mousePosition.current[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }
      program.uniforms.iTime.value = t * 0.001;

      try {
        renderer.render({ scene: mesh });
        animationFrameId.current = requestAnimationFrame(update);
      } catch (err) {
        console.error("Render error:", err);
        errorRef.current = `Render error: ${err}`;
      }
    }
    
    // Initialize
    initializeWebGL();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      window.removeEventListener("resize", resize);
      
      if (enableMouseInteraction && containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      
      // Clean up WebGL context
      if (gl) {
        if (gl.canvas instanceof HTMLCanvasElement) {
          gl.canvas.removeEventListener('webglcontextlost', handleContextLost);
          gl.canvas.removeEventListener('webglcontextrestored', handleContextRestored);
          
          if (container.contains(gl.canvas as Node)) {
            container.removeChild(gl.canvas as Node);
          }
        }
        
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div 
      ref={containerRef} 
      className={`${position} inset-0 ${className}`}
      style={{ zIndex }}
    >
      {contextLost && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)] opacity-30"></div>
      )}
      {errorRef.current && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-black bg-opacity-50">
          <div className="p-4 bg-black rounded">
            <h3 className="text-lg font-bold">WebGL Error</h3>
            <p>{errorRef.current}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Threads;
