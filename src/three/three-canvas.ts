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
} from 'three';

/**
 * entry of threejs
 *
 * - provide a canvas
 * - can be remounted by other react component to avoid frequent re-initialization
 */
export class ThreeCanvas {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;

  camera: PerspectiveCamera;
  scene: Scene;

  private resizeDur = 200;
  private lastResizeTime = -1;
  private resizeTimer = -1;
  private isWaitingResize = false;

  init(params?: IThreeCanvasInitOpts) {
    const rendererParams = { antialias: true, alpha: false, ...params?.rendererParams };
    const renderer = new WebGLRenderer(rendererParams);
    this.renderer = renderer;

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
    const win = window as any;
    win.canvas = canvas;
    win.renderer = renderer;
    win.camera = this.camera;
    win.scene = this.scene;
    win.gl = renderer.getContext();
  }

  private setup() {
    const scene = new Scene();
    this.scene = scene;

    const camera = new PerspectiveCamera();
    this.camera = camera;
    camera.position.z = 5;
    scene.add(camera);

    const geometry = new BoxGeometry();
    const mtl = new MeshBasicMaterial();
    const cube = new Mesh(geometry, mtl);
    scene.add(cube);

    this.renderer.setAnimationLoop(this.render);
  }

  setParent(parent: HTMLElement) {
    parent.appendChild(this.canvas);
    this.resize();
  }

  private render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  private listen() {
    // this.unlisten();
    window.addEventListener('resize', this.startResizeTimer);
  }

  private unlisten() {
    // TODO: no destroy yet
    window.removeEventListener('resize', this.startResizeTimer);
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

export const threeCanvas = new ThreeCanvas(); // remenber to init when if needed
