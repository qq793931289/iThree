import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
// import { Stats } from 'three/examples/jsm/libs/stats.module.js';
export class Skyland {

  public container?: HTMLElement | null;
  public controls?: OrbitControls;
  public camera?: THREE.PerspectiveCamera;
  public scene?: THREE.Scene;
  public renderer?: THREE.WebGLRenderer;
  public mesh?: THREE.Mesh;

  // constructor(props) {
  //   super(props);
  // }

  constructor() {

    console.log('init ithree 1.0.3');

    this.componentDidMount();
  }

  public componentDidMount() {
    // console.log(this.props.match.params);
    // console.log(this.props.history.location.state);
    // console.log(THREE);

    this.init();
    this.renderCanvas();
    // this.onWindowResize();

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

  }

  public renderCanvas = () => {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
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
    this.scene.background = new THREE.Color(0xEEEEEE);

    this.scene.add(new THREE.AmbientLight(0xFFFFFF));

    const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);


    const box = new THREE.SphereBufferGeometry(4, 4, 4, 1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
      // color: 0xFFFF00,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    this.mesh = new THREE.Mesh(box, material);
    this.scene.add(this.mesh);

    // lights
    const mainLight = new THREE.PointLight(0xCCCCCC, 1.5, 250);
    mainLight.position.y = 60;
    this.scene.add(mainLight);

    const greenLight = new THREE.PointLight(0x00FF00, 0.25, 1000);
    greenLight.position.set(550, 50, 0);
    this.scene.add(greenLight);

    const redLight = new THREE.PointLight(0xFF0000, 0.25, 1000);
    redLight.position.set(- 550, 50, 0);
    this.scene.add(redLight);

    const blueLight = new THREE.PointLight(0x7F7FFF, 0.25, 1000);
    blueLight.position.set(0, 50, 550);
    this.scene.add(blueLight);

    const grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.1;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    this.scene.add(grid);

    // scene size
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const geometry1 = new THREE.CircleBufferGeometry(40, 64);
    const groundMirror = new Reflector(geometry1, {
      clipBias: 0.003,
      textureWidth: WIDTH * window.devicePixelRatio,
      textureHeight: HEIGHT * window.devicePixelRatio,
      color: 0x777777 as any,
      // recursion: 1,
    });
    groundMirror.position.y = 0.5;
    groundMirror.rotateX(- Math.PI / 2);
    this.scene.add(groundMirror);

    const geometry = new THREE.PlaneBufferGeometry(100, 100);
    const verticalMirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: WIDTH * window.devicePixelRatio,
      textureHeight: HEIGHT * window.devicePixelRatio,
      color: 0x889999 as any,
      // recursion: 1,
    });
    verticalMirror.position.y = 50;
    verticalMirror.position.z = - 50;
    this.scene.add(verticalMirror);


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

    window.addEventListener('resize', this.onWindowResize, false);

  }

}