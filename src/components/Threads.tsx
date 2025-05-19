import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
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
  color = [1, 0.2, 0.2], // Red color to match your theme
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const errorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    try {
      const renderer = new Renderer({ alpha: true });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      container.appendChild(gl.canvas);

      const geometry = new Triangle(gl);

      // Enhanced shader compilation error handling
      const compileShader = (type: number, source: string): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) {
          errorRef.current = "Failed to create shader";
          return null;
        }
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const error = gl.getShaderInfoLog(shader);
          errorRef.current = `Shader compilation error: ${error}`;
          console.error(`Shader compilation error: ${error}`);
          gl.deleteShader(shader);
          return null;
        }
        
        return shader;
      };

      // Try creating the program manually to get better error reporting
      const vertexShaderObj = compileShader(gl.VERTEX_SHADER, vertexShader);
      const fragmentShaderObj = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
      
      if (!vertexShaderObj || !fragmentShaderObj) {
        return;
      }

      // Create and compile the program with error handling
      let program: Program;
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

      const mesh = new Mesh(gl, { geometry, program });

      function resize() {
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
        if (program && program.uniforms && program.uniforms.iResolution) {
          program.uniforms.iResolution.value.r = clientWidth;
          program.uniforms.iResolution.value.g = clientHeight;
          program.uniforms.iResolution.value.b = clientWidth / clientHeight;
        }
      }
      window.addEventListener("resize", resize);
      resize();

      // Use an object to store mouse position that can be mutated
      const mousePosition = {
        current: [0.5, 0.5],
        target: [0.5, 0.5]
      };

      function handleMouseMove(e: MouseEvent) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mousePosition.target = [x, y];
      }
      
      function handleMouseLeave() {
        mousePosition.target = [0.5, 0.5];
      }
      
      if (enableMouseInteraction) {
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
      }

      function update(t: number) {
        if (!program || !program.uniforms) {
          console.error("Program or uniforms are undefined");
          errorRef.current = "Program or uniforms are undefined";
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
          if (!errorRef.current) { // Only continue animation if no errors
            animationFrameId.current = requestAnimationFrame(update);
          }
        } catch (err) {
          console.error("Render error:", err);
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
          errorRef.current = `Render error: ${err}`;
        }
      }
      
      animationFrameId.current = requestAnimationFrame(update);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        window.removeEventListener("resize", resize);

        if (enableMouseInteraction) {
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
        if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    } catch (err) {
      console.error("Initialization error:", err);
      errorRef.current = `Initialization error: ${err}`;
      return () => {};
    }
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div ref={containerRef} className={`fixed inset-0 z-0 ${className}`}>
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
