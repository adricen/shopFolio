import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Vector2, Vector3 } from 'three';
import DebugPanel from './SceneDebugPanel';

class SceneManager {
    scene: Scene;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    layerType: 'back' | 'front';
    constructor(canvas: HTMLCanvasElement, layerType: 'back' | 'front') {
        DebugPanel.addFolder(`Scene ${layerType}`);
        this.layerType = layerType;
        const { innerWidth, innerHeight } = window;
        this.scene = new Scene();
        const cameraClipLimit = 5;
        this.camera = new PerspectiveCamera(
            /* fov */ 75,
            /* aspect */ innerWidth / innerHeight,
            /* near */ this.layerType === 'front' ? .1 : cameraClipLimit,
            /* far */ this.layerType === 'front' ? cameraClipLimit : 100
        );
        this.camera.position.z = -cameraClipLimit;
        this.addCameraDebugPanel();
        console.log(this.camera);
        this.renderer = new WebGLRenderer({
            canvas,
            precision: 'highp',
            alpha: true,
            powerPreference: 'high-performance',
            antialias: true,
            logarithmicDepthBuffer: false, // a regarder pour le depth
            reverseDepthBuffer: false,
        });
        this.testScene();
    }
    addCameraDebugPanel() {
        const mainFolder = DebugPanel.getFolder(`Scene ${this.layerType}`)
        if (!mainFolder) {
            return;
        }
        const cameraFolder = mainFolder.addFolder({title: 'Camera'});
        const {camera} = this;
        cameraFolder.addBinding({
            get near(): number {
                return camera.near;
            },
            set near(value) {
                camera.near = value;
                camera.updateProjectionMatrix();
            }
        }, 'near', {min: 0.1, max: 10, step: 0.01});
        cameraFolder.addBinding({
            get far(): number {
                return camera.far;
            },
            set far(value) {
                camera.far = value;
                camera.updateProjectionMatrix();
            }
        }, 'far', {min: 0.1, max: 100, step: 0.01});
    }

    getCurrentViewport() {
        // TODO: For now it set zero point reference
        const { width, height } = this.renderer.getSize(new Vector2(0,0));
        const distance = this.camera.position.distanceTo(new Vector3(0,0,0));
        
        const fov = (this.camera.fov * Math.PI) / 180; // convert vertical fov to radians
        const h = 2 * Math.tan(fov / 2) * distance; // visible height
        const w = h * (width / height);
        return { width: w, height: h, factor: width / w, distance };
    }
    
    testScene() {
        const {width, height} = this.getCurrentViewport()
        console.log(width, height);
        const limitCubeGeometry = new BoxGeometry(width*1.87, height * 2.3, 2.5);
        const limitMaterial = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        const limitCube = new Mesh(limitCubeGeometry, limitMaterial);
        limitCube.position.z = width / 2;
        this.scene.add(limitCube);
        const geometry = new BoxGeometry(1,1,1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        this.camera.lookAt(cube.position);
        cube.name = 'cube';
        this.scene.add(cube);
    }

    /**
     * animation loop
     */
    renderFrame() {
        requestAnimationFrame(this.renderFrame.bind(this));
        const cube = this.scene.getObjectByName('cube');
        if (cube) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager;