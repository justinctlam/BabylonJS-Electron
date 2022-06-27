import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Material } from '@babylonjs/core/Materials/material';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

export default class Renderer {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;

    createScene(canvas: HTMLCanvasElement, engine: Engine) {
        this._canvas = canvas;
        this._engine = engine;

        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        this._scene = scene;

        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        const sphere = MeshBuilder.CreateSphere("sphere1", {
            segments: 16, diameter: 2,
        }, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = MeshBuilder.CreateGround('ground1', {
            width: 6, height: 6, subdivisions: 2 
        }, scene);
        let groundMaterial = new Material('Ground Material', scene);
        ground.material = groundMaterial;
    }

    initialize(canvas: HTMLCanvasElement) {
        const engine = new Engine(canvas, true);
        this.createScene(canvas, engine);

        engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });
    }
}

const renderer = new Renderer();
renderer.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);
