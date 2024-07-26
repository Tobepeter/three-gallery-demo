import { hmrOnce } from '@/utils/decorators';
import {
  WebGLRenderer,
  Object3D,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRendererParameters,
  Camera,
  Box3,
  AmbientLight,
  Raycaster,
  Vector2,
  Intersection,
  SphereGeometry,
  Texture,
} from 'three';
import { GLTFLoader, OrbitControls, TransformControls } from 'three/examples/jsm/Addons.js';
import { ThreeInput } from './three-input';
import { threeUtil } from '@/utils/three-util';

/**
 * entry of threejs
 *
 * - provide a canvas
 * - can be remounted by other react component to avoid frequent re-initialization
 */
export class ThreeCanvas {
  input = new ThreeInput(this);

  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;

  camera: PerspectiveCamera;
  ambientLight: AmbientLight;
  scene: Scene;

  glbUrl = '';
  model: Mesh | null = null; // NOTE: only support no hierarchy model
  orinalTexture: Texture | null = null;

  orbit: OrbitControls;
  tfCtrl: TransformControls;

  rayCaster: Raycaster;
  rayCastSphere: Mesh;

  private resizeDur = 200;
  private lastResizeTime = -1;
  private resizeTimer = -1;
  private isWaitingResize = false;

  isDefault = false;

  constructor(isDefault = false) {
    this.isDefault = isDefault;
  }

  init(params?: IThreeCanvasInitOpts) {
    const rendererParams = { antialias: true, alpha: false, ...params?.rendererParams };
    const renderer = new WebGLRenderer(rendererParams);
    this.renderer = renderer;
    // TODO: use theme token
    renderer.setClearColor(0xddd6fe);

    const canvas = renderer.domElement;
    this.canvas = canvas;
    let parent = params?.parent;
    if (parent === 'body') {
      parent = document.body;
    }
    if (parent) {
      parent.appendChild(canvas);
    }

    this.listen();
    this.setup();
    this.resize();

    // for debug
    if (this.isDefault) {
      const win = window as any;
      win.threeCanvas = this;
      win.threeCanvas = this;
      win.canvas = canvas;
      win.renderer = renderer;
      win.camera = this.camera;
      win.scene = this.scene;
      win.gl = renderer.getContext();
    }
  }

  private setup() {
    const scene = new Scene();
    this.scene = scene;

    const camera = new PerspectiveCamera();
    this.camera = camera;
    scene.add(camera);
    this.resetCamera();

    const ambientLight = new AmbientLight(0xffffff, 2);
    this.ambientLight = ambientLight;
    scene.add(ambientLight);

    // const geometry = new BoxGeometry();
    // const mtl = new MeshBasicMaterial();
    // const cube = new Mesh(geometry, mtl);
    // scene.add(cube);

    this.addControl();
    this.rayCaster = new Raycaster();

    this.renderer.setAnimationLoop(this.render);
  }

  private addControl() {
    const orbit = new OrbitControls(this.camera, this.canvas);
    this.orbit = orbit;
    orbit.enableDamping = true;

    const tfCtrl = new TransformControls(this.camera, this.canvas);
    this.tfCtrl = tfCtrl;
    this.scene.add(tfCtrl);
    tfCtrl.size = 0.75;
    tfCtrl.space = 'world';

    // disable orbitControls while using transformControls
    tfCtrl.addEventListener('dragging-changed', function (event) {
      orbit.enabled = !event.value;
    });
  }

  // TODO: use event-dispatcher
  checkHitModel(uiNorm: Vector2) {
    if (!this.model) return;

    const rayCaster = this.rayCaster;
    rayCaster.setFromCamera(uiNorm, this.camera);
    const intersects: Intersection[] = [];
    // this.model.raycast(rayCaster, intersects);
    this.rayCastSphere.raycast(rayCaster, intersects);
    const isHit = intersects.length > 0;
    this.tfCtrl.visible = isHit;
  }

  // TODO: useing keyboard need reflect to UI
  changeTfMode(mode: TransformMode) {
    this.tfCtrl.setMode(mode);
    this.tfCtrl.visible = true;
  }

  export() {
    if (!this.model) {
      return;
    }
    threeUtil.exportGlb(this.model, 'model.glb');
  }

  async loadModel(glbUrl: string) {
    const isBlob = glbUrl.startsWith('blob:');
    if (this.glbUrl === glbUrl) {
      return;
    }
    this.glbUrl = glbUrl;

    if (!glbUrl) {
      this.scene.remove(this.model!);
      this.model = null;
      return;
    }

    // TODO: notify loading state

    const loader = new GLTFLoader();

    return new Promise<void>((resolve, reject) => {
      loader.load(
        glbUrl,
        (gltf) => {
          // in case load another model before this one loaded
          if (this.glbUrl !== glbUrl) return;
          const mesh = gltf.scene.children[0] as Mesh;
          const mtl = mesh.material as MeshBasicMaterial;

          // do not record upload glb change
          if (!isBlob) {
            this.orinalTexture = mtl.map;
          }
          this.onModelAdd(mesh);
          resolve();
        },
        undefined,
        reject,
      );
    });
  }

  private onModelAdd(model: Mesh) {
    if (this.model) {
      this.scene.remove(this.model);
    }

    this.resetCamera();

    // TODO: make the best view of camera

    // calc bounding
    // model.geometry.computeBoundingBox();
    // console.log('bounding', model.geometry.boundingBox);

    this.model = model;
    this.scene.add(model);
    this.tfCtrl.attach(model);

    // -- raycast touch --
    model.geometry.computeBoundingSphere();
    const boundingSphere = model.geometry.boundingSphere!;
    const mtl = new MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    const sphere = new Mesh(new SphereGeometry(boundingSphere.radius), mtl);
    this.rayCastSphere = sphere;
    sphere.position.copy(boundingSphere.center);
  }

  setParent(parent: HTMLElement) {
    parent.appendChild(this.canvas);
    this.resize();
  }

  reset() {
    this.resetCamera();

    const model = this.model;
    if (model) {
      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);
      model.rotation.set(0, 0, 0);

      const mtl = model.material as MeshBasicMaterial;
      mtl.map = this.orinalTexture;
    }
  }

  resetCamera() {
    const camera = this.camera;
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);
  }

  mirrorX() {
    if (!this.model) {
      return;
    }
    this.model.scale.x *= -1;
  }

  mirrorY() {
    if (!this.model) {
      return;
    }
    this.model.scale.y *= -1;
  }

  downloadTexture() {
    if (!this.model) {
      return;
    }

    const texture = (this.model.material as MeshBasicMaterial).map;
    if (!texture) {
      return;
    }

    const canvas = threeUtil.texture2Canvas(texture);
    threeUtil.downloadCanvas(canvas, 'texture.png');
  }

  changeSkin(texture: Texture) {
    if (!this.model) {
      return;
    }

    const mtl = this.model.material as MeshBasicMaterial;
    mtl.map = texture;
    mtl.needsUpdate = true;
  }

  private render = () => {
    this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  };

  private listen() {
    // this.unlisten();
    window.addEventListener('resize', this.startResizeTimer);
    this.input.listen();
  }

  private unlisten() {
    // TODO: no destroy yet
    window.removeEventListener('resize', this.startResizeTimer);
    this.input.unListen();
  }

  private startResizeTimer = () => {
    // if last resize is too close, delay to size
    // if is resizing, refresh timer
    if (this.isWaitingResize || Date.now() - this.lastResizeTime < this.resizeDur) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(this.resize, this.resizeDur);
      return;
    }
    this.resize();
  };

  private resize = () => {
    this.isWaitingResize = false;
    this.lastResizeTime = Date.now();
    // console.log('resize');

    const parent = this.canvas.parentElement;
    let width = 800;
    let height = 800;
    if (parent) {
      width = parent.clientWidth;
      height = parent.clientHeight;
    }
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height, true);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };
}

export interface IThreeCanvasInitOpts {
  rendererParams?: WebGLRendererParameters;

  // if no parent, just initialize, attach parent latter
  parent?: HTMLElement | 'body';
}

export const threeCanvas = new ThreeCanvas(true); // remenber to init when if needed
