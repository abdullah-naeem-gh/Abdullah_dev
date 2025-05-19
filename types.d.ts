declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module 'ogl' {
    export class Renderer {
        constructor(options: { alpha?: boolean });
        setSize(width: number, height: number): void;
        render(options: { scene: any }): void;
        gl: WebGLRenderingContext;
    }
    
    export class Program {
        constructor(
            gl: WebGLRenderingContext, 
            options: { 
                vertex: string; 
                fragment: string; 
                uniforms?: Record<string, any>; 
            }
        );
        uniforms: Record<string, any>;
    }
    
    export class Mesh {
        constructor(gl: WebGLRenderingContext, options: { geometry: any; program: Program });
    }
    
    export class Triangle {
        constructor(gl: WebGLRenderingContext);
    }
    
    export class Color {
        constructor(r: number, g: number, b: number);
        r: number;
        g: number;
        b: number;
    }
}
