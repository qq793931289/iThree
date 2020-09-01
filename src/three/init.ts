import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
// import 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
// console.log(THREE);

export class ThreeRun {

  public container?: HTMLElement | null;
  public controls?: OrbitControls;
  public camera?: THREE.PerspectiveCamera;
  public scene?: THREE.Scene;
  public renderer?: THREE.WebGLRenderer;
  public mesh?: THREE.Mesh;
  public composer?: EffectComposer;
  public afterimagePass?: AfterimagePass;

  // constructor(props) {
  //   super(props);
  // }

  constructor() {

    console.log('init ithree 1.0.3');

    // this.componentDidMount();
  }

  public componentDidMount() {
    // console.log(this.props.match.params);
    // console.log(this.props.history.location.state);
    // console.log(THREE);

    this.init();
    this.renderCanvas();
    this.onWindowResize();

  }

  public onWindowResize = () => {
    if (!this.camera) {
      console.log(this.camera);
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();

    this.renderer!.setSize(window.innerWidth, window.innerHeight);

    this.renderCanvas();

  }

  //
  public animate = () => {

    window.requestAnimationFrame(this.animate);

    this.renderCanvas();

    this.mesh!
      .rotateX(0.002 * Math.random() * 4)
      .rotateY(0.002 * Math.random() * 4)
      .rotateZ(-0.002 * Math.random() * 4);

  }

  public renderCanvas = () => {

    // this.renderer.render(this.scene, this.camera);
    if (this.composer) {
      this.composer.render();
    }
  }

  public init() {

    // this.container = document.createElement('div');
    this.container = document.getElementById('threeContainer');
    // document.body.appendChild(this.container);

    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    // this.camera.position.set(- 1.8, 0.6, 2.7);

    this.camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 1, 3500);
    this.camera.position.z = 2750;

    // console.log(this.container);
    // const SCREEN_WIDTH = this.container.style.width;
    // const SCREEN_HEIGHT = this.container.style.height;
    // const aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    // const frustumSize = 600;
    // this.camera = new THREE.OrthographicCamera(0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000);

    this.scene = new THREE.Scene();

    this.scene.add(new THREE.AmbientLight(0x444444));

    const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    light2.position.set(0, - 1, 0);
    this.scene.add(light2);

    const box = new THREE.SphereBufferGeometry(4, 4, 4, 1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
      // color: 0xFFFF00,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    this.mesh = new THREE.Mesh(box, material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container!.appendChild(this.renderer.domElement);

    this.renderer.autoClearStencil = false;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', this.renderCanvas); // use if there is no animation loop
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.target.set(0, 0, - 0.2);
    this.controls.update();

    this.animate();

    // postprocessing

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.afterimagePass = new AfterimagePass();
    this.composer.addPass(this.afterimagePass);

    // this.afterimagePass.uniforms['damp'] = 0.99;
    // this.afterimagePass.uniforms.damp = 0.999;

    window.addEventListener('resize', this.onWindowResize, false);

  }

}