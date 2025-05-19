declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

// Extended OGL type definitions to prevent TypeScript errors
declare module 'ogl' {
    export class Renderer {
        constructor(options: { alpha?: boolean });
        setSize(width: number, height: number): void;
        render(options: { scene: any }): void;
        gl: WebGLRenderingContext & {
            renderer?: Renderer;
            canvas: HTMLCanvasElement;
        };
    }
    
    export class Program {
        constructor(
            gl: WebGLRenderingContext & { renderer?: Renderer; canvas: HTMLCanvasElement; }, 
            options: { 
                vertex: string; 
                fragment: string; 
                uniforms?: Record<string, any>; 
            }
        );
        uniforms: Record<string, any>;
    }
    
    export class Mesh {
        constructor(
            gl: WebGLRenderingContext & { renderer?: Renderer; canvas: HTMLCanvasElement; }, 
            options: { geometry: any; program: Program }
        );
    }
    
    export class Triangle {
        constructor(gl: WebGLRenderingContext & { renderer?: Renderer; canvas: HTMLCanvasElement; });
    }
    
    export class Color {
        constructor(r: number, g: number, b: number);
        r: number;
        g: number;
        b: number;
    }
}
