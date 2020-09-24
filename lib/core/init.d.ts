import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
export declare class Core {
    container?: HTMLElement | null;
    controls?: OrbitControls;
    camera?: THREE.PerspectiveCamera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    mesh?: THREE.Mesh;
    composer?: EffectComposer;
    afterimagePass?: AfterimagePass;
    constructor();
    componentDidMount(): void;
    onWindowResize: () => void;
    animate: () => void;
    renderCanvas: () => void;
    init(): void;
}
