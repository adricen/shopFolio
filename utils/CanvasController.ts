import type SceneManager from './SceneManager';

// the simplest canvas controller structure to deal with two render unsing the same scene
class CanvasController {
    canvas: HTMLCanvasElement;
    renderScene: SceneManager;
    constructor(canvas: HTMLCanvasElement, renderScene: SceneManager) {
        this.canvas = canvas;
        this.canvasSizeFromDomParent();

        // set render scene
        this.renderScene = renderScene;
        this.renderScene.renderer.setSize(
            this.canvas.width,
            this.canvas.height,
        );
        
        window.addEventListener(
            'resize',
            this.canvasSizeFromDomParent.bind(this),
        );

        // canvas controlle render loop
        this.renderScene.renderFrame();
    }

    canvasSizeFromDomParent() {
        if (!this.canvas.parentElement) {
            return;
        }
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }
    
}

export default CanvasController;