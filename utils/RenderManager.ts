import { frontFacing } from 'three/webgpu';
import CanvasController from './CanvasController';

class RenderManager {
    private static _instance: RenderManager;
    canvasContainer: {
        background: CanvasController | null;
        foreground: CanvasController | null;
    } = {
        background: null,
        foreground: null
    }

    private static get instance() {
        if (!RenderManager._instance) {
            RenderManager._instance = new RenderManager();
        }
        return RenderManager._instance;
    }

    static set backgroundCanvas(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            if (RenderManager.instance.canvasContainer.background) {
                // TODO: canvasMethod destroy
                // RenderManager.instance.canvasContainer.background.dispose();
            }
            RenderManager.instance.canvasContainer.background = null;
        } else {
            const renderScene = new SceneManager(canvas, 'back');
            RenderManager.instance.canvasContainer.background =  new CanvasController(canvas, renderScene);
        }
    }

    static set foregroundCanvas(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            if (RenderManager.instance.canvasContainer.foreground) {
                // TODO: canvasMethod destroy
                // RenderManager.instance.canvasContainer.background.dispose();
            }
            RenderManager.instance.canvasContainer.foreground = null;
        } else {
            const renderScene = new SceneManager(canvas, 'front');
            RenderManager.instance.canvasContainer.foreground =  new CanvasController(canvas, renderScene);
        }
    }
}

export default RenderManager;