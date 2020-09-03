import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
// import { API } from '../api';
// import 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
// console.log(THREE);

import WorldJson from '../sampledata/world.json';
// import WorldJson from '../sampledata/teapotclaraio.json';

export class DigitalEarth {

  public container?: HTMLElement | null;
  public controls?: OrbitControls;
  public camera?: THREE.PerspectiveCamera;
  public scene?: THREE.Scene;
  public renderer?: THREE.WebGLRenderer;
  public mesh?: THREE.Mesh | THREE.Points;
  public composer?: EffectComposer;
  public afterimagePass?: AfterimagePass;

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

    // this.mesh!
    //   .rotateX(0.002 * Math.random() * 4)
    //   .rotateY(0.002 * Math.random() * 4)
    //   .rotateZ(-0.002 * Math.random() * 4);

  }

  public renderCanvas = () => {

    if (this.renderer) {
      this.renderer.render(this.scene!, this.camera!);
    }
    // if (this.composer) {
    //   this.composer.render();
    // }
  }

  public init() {

    // this.container = document.createElement('div');
    this.container = document.getElementById('threeContainer');
    // document.body.appendChild(this.container);

    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    // this.camera.position.set(- 1.8, 0.6, 2.7);

    this.camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 1, 35000000000);
    this.camera.position.z = 100000000;

    this.camera.position.set(-500, 500, 10000000);


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


    const box = new THREE.SphereBufferGeometry(4, 520, 200);
    // const material = new THREE.MeshNormalMaterial({
    //   // color: 0xFFFF00,
    //   wireframe: true,
    //   transparent: true,
    //   opacity: 0.6,
    // });
    const material = new THREE.PointsMaterial({
      color: 0x00FF00,
      size: 0.04,
    });

    this.mesh = new THREE.Points(box, material);
    this.scene.add(this.mesh);

    // BEGIN Clara.io JSON loader code
    // const objectLoader = new THREE.ObjectLoader();
    // // objectLoader.load('../sampledata/teapotclaraio.json', (obj) => {
    // // objectLoader.load(WorldJson, (obj) => {
    // objectLoader.load('https://threejs.org/examples/models/json/lightmap/lightmap.json', (res: any) => {
    //   // objectLoader.load('https://blog-1256207336.cos-website.ap-chengdu.myqcloud.com/static/media/world.b6196b30.json', (obj) => {
    //   // objectLoader.load('https://www.wellyyss.cn/data/ysThree/geoJson/world.json', (obj) => {

    //   console.log(res, 'world.json');

    //   // this.scene!.add(obj);

    // });

    const group = new THREE.Group();
    group.position.y = 50;
    this.scene.add(group);

    this.camera.lookAt(group.position);

    this.scene.add(new THREE.AxesHelper(20));

    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');

    // // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(0.008, 0.008);

    const res = WorldJson;

    console.log(res, 'world.json000000');

    // API.Axios.get('https://v-edu.org.cn/sre/file/map/geoatlas/100000_full.json').then(res => {
    // API.Axios.get('https://v-edu.org.cn/sre/file/map/geoatlas/100000_full.json').then(res => {
    // API.Axios.get('../sampledata/teapotclaraio.json').then(res => {
    console.log(res, 'world.json000000');

    // const features = res.data.features;
    const features = res.features;

    console.log(features, 'features');

    features.map((data: Object) => {

      console.log(data, 'data');

      // data.geometry.coordinates

    });

    // const instances = [];
    // for (let i = 0; i < features.length; i++) {
    for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
        const polygonArr0 = features[i].geometry.coordinates[j]; //.toString().split(',').map((v: string) => { return Number(v); });

        console.log(polygonArr0, 'polygonArr0');

        const polygonArr = polygonArr0[0];


        if (!polygonArr) { return; }
        if (polygonArr.length === 0) { return; }

        console.log(polygonArr, 'polygonArr');

        // const geometry = new THREE.bufferGeometry();

        // California

        const californiaPts: THREE.Vector2[] = [];

        polygonArr.map((v: number[], index: number) => {

          console.log(v, index, 'polygonArr');

          californiaPts.push(new THREE.Vector2(v[0] - 113, v[1] - 22).multiplyScalar(20));

        });

        // for (let p = 0; i < polygonArr.length; p++) {
        //   // californiaPts[p].multiplyScalar(0.25);
        //   console.log(polygonArr[p], 'polygonArr[p]');
        //   // californiaPts.push(new THREE.Vector2(polygonArr[p][0], polygonArr[p][1]));
        // }

        // californiaPts.push(new THREE.Vector2(polygonArr[0][0], polygonArr[0][1]));

        // californiaPts.push(new THREE.Vector2(610, 320));
        // californiaPts.push(new THREE.Vector2(450, 300));
        // californiaPts.push(new THREE.Vector2(392, 392));
        // californiaPts.push(new THREE.Vector2(266, 438));
        // californiaPts.push(new THREE.Vector2(190, 570));
        // californiaPts.push(new THREE.Vector2(190, 600));
        // californiaPts.push(new THREE.Vector2(160, 620));
        // californiaPts.push(new THREE.Vector2(160, 650));
        // californiaPts.push(new THREE.Vector2(180, 640));
        // californiaPts.push(new THREE.Vector2(165, 680));
        // californiaPts.push(new THREE.Vector2(150, 670));
        // californiaPts.push(new THREE.Vector2(90, 737));
        // californiaPts.push(new THREE.Vector2(80, 795));
        // californiaPts.push(new THREE.Vector2(50, 835));
        // californiaPts.push(new THREE.Vector2(64, 870));
        // californiaPts.push(new THREE.Vector2(60, 945));
        // californiaPts.push(new THREE.Vector2(300, 945));
        // californiaPts.push(new THREE.Vector2(300, 743));
        // californiaPts.push(new THREE.Vector2(600, 473));
        // californiaPts.push(new THREE.Vector2(626, 425));
        // californiaPts.push(new THREE.Vector2(600, 370));
        // californiaPts.push(new THREE.Vector2(610, 320));

        // for (let p = 0; i < californiaPts.length; p++) { californiaPts[p].multiplyScalar(0.25); }

        const californiaShape = new THREE.Shape(californiaPts);

        const addShape = function (shape: THREE.Shape, extrudeSettings: Object, color: any, x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number) {

          // flat shape with texture
          // note: default UVs generated by THREE.ShapeBufferGeometry are simply the x- and y-coordinates of the vertices

          let geometry = new THREE.ShapeBufferGeometry(shape);

          let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            // map: texture,
          }));
          mesh.position.set(x, y, z - 175);
          mesh.rotation.set(rx, ry, rz);
          mesh.scale.set(s, s, s);
          group.add(mesh);

          // flat shape

          geometry = new THREE.ShapeBufferGeometry(shape);

          mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide }));
          mesh.position.set(x, y, z - 125);
          mesh.rotation.set(rx, ry, rz);
          mesh.scale.set(s, s, s);
          group.add(mesh);

          // extruded shape

          geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

          mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color }));
          mesh.position.set(x, y, z - 75);
          mesh.rotation.set(rx, ry, rz);
          mesh.scale.set(s, s, s);
          group.add(mesh);

          // addLineShape(shape, color, x, y, z, rx, ry, rz, s);

        };

        const randomHexColor = function () { //随机生成十六进制颜色
          let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
          while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
          }
          return '#' + hex; //返回‘#'开头16进制颜色
        };

        const extrudeSettings1 = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        addShape(californiaShape, extrudeSettings1, new THREE.Color(randomHexColor()), - 300, - 100, 0, 0, 0, 0, 1);

        // const polygon = new Cesium.PolygonGeometry({
        //   polygonHierarchy: new Cesium.PolygonHierarchy(
        //     Cesium.Cartesian3.fromDegreesArray(polygonArr),
        //   ),
        //   vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        // });
        // const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

      }
    }

    // });

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

    // this.composer = new EffectComposer(this.renderer);
    // this.composer.addPass(new RenderPass(this.scene, this.camera));

    // this.afterimagePass = new AfterimagePass();
    // this.composer.addPass(this.afterimagePass);

    // this.afterimagePass.uniforms['damp'] = 0.99;
    // this.afterimagePass.uniforms.damp = 0.999;

    window.addEventListener('resize', this.onWindowResize, false);

  }

}