import { Vector2 } from 'three';
import { ThreeCanvas } from './three-canvas';

export class ThreeInput {
  mouseX = 999;
  mouseY = 999;

  threeCanvas: ThreeCanvas;

  constructor(threeCanvas: ThreeCanvas) {
    this.threeCanvas = threeCanvas;
  }

  trasformToUiCoord(x: number, y: number) {
    const size = new Vector2();
    this.threeCanvas.renderer.getSize(size);
    const uiNormX = (x / size.width) * 2 - 1;
    const uiNormY = (-y / size.height) * 2 + 1;
    return new Vector2(uiNormX, uiNormY);
  }

  listen() {
    const canvas = this.threeCanvas.canvas;
    canvas.addEventListener('mousemove', this.onPointerMove);
    canvas.addEventListener('mousedown', this.onPointerDown);
    canvas.addEventListener('mouseup', this.onPointerUp);
    window.addEventListener('keydown', this.onKeydown);
  }

  unListen() {
    const canvas = this.threeCanvas.canvas;
    canvas.removeEventListener('mousemove', this.onPointerMove);
    canvas.removeEventListener('mousedown', this.onPointerDown);
    canvas.removeEventListener('mouseup', this.onPointerUp);
    window.removeEventListener('keydown', this.onKeydown);
  }

  private onPointerMove = (event: MouseEvent) => {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
  };

  private onPointerDown = (event: MouseEvent) => {};

  private onKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'w':
        this.threeCanvas.changeTfMode('translate');
        break;
      case 'e':
        this.threeCanvas.changeTfMode('rotate');
        break;
      case 'r':
        this.threeCanvas.changeTfMode('scale');
        break;
      default:
        break;
    }
  };

  private onPointerUp = (event: MouseEvent) => {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    const uiNorm = this.trasformToUiCoord(this.mouseX, this.mouseY);
    this.threeCanvas.checkHitModel(uiNorm);
  };
}
