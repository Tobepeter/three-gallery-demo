import { Object3D, Texture } from 'three';
import { GLTFExporter } from 'three/examples/jsm/Addons.js';

class ThreeUtil {
  exportGlb(scene: Object3D, name: string) {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (glb) => {
        const blob = new Blob([glb as ArrayBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
      },
      (err) => {
        console.error(err);
      },
      { binary: true },
    );
  }

  texture2Canvas(texture: Texture) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const img = texture.image as HTMLImageElement;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    return canvas;
  }

  downloadCanvas(canvas: HTMLCanvasElement, name: string) {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  }
}

export const threeUtil = new ThreeUtil();
