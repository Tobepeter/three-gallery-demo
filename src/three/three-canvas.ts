import { WebGLRenderer, WebGLRendererParameters } from "three";

/**
 * entry of threejs
 *
 * - provide a canvas
 * - can be remounted by other react component to avoid frequent re-initialization
 */
export class ThreeCanvas {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;
  renderer: WebGLRenderer;

  init(params?: IThreeCanvasInitOpts) {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;

    let parent = params?.parent;
    if (parent === "body") {
      parent = document.body;
    }
    if (parent) {
      parent.appendChild(canvas);
    }

    this.listen();

    const rendererParams = { antialias: true, ...params?.rendererParams };
    const renderer = new WebGLRenderer(rendererParams);
    this.renderer = renderer;
  }

  private listen() {
    // this.unlisten();
    window.addEventListener("resize", this.resize);
  }

  private unlisten() {
    // TODO: no destroy yet
    window.removeEventListener("resize", this.resize);
  }

  private resize = () => {
    const parent = this.canvas.parentElement;
    let width = 800;
    let height = 800;
    if (parent) {
      width = parent.clientWidth;
      height = parent.clientHeight;
    }
    this.renderer.setSize(width, height, true);
  };
}

export interface IThreeCanvasInitOpts {
  rendererParams?: WebGLRendererParameters;

  // if no parent, just initialize, attach parent latter
  parent?: HTMLElement | "body";
}
