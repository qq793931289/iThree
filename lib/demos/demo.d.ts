import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export declare class ThreeRun {
    container?: HTMLElement | null;
    controls?: OrbitControls;
    camera?: THREE.PerspectiveCamera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    mesh?: THREE.Mesh;
    constructor();
    componentDidMount(): void;
    onWindowResize: () => void;
    animate: () => void;
    renderCanvas: () => void;
    init(): void;
}
