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

  file2Image(file: File) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          resolve(img);
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  file2Texture(file: File) {
    return new Promise<Texture>((resolve, reject) => {
      this.file2Image(file).then((img) => {
        const texture = new Texture(img);
        texture.needsUpdate = true;
        resolve(texture);
      });
    });
  }

  getChessboardCanvas() {
    const canvas = document.createElement('canvas');
    const width = 100;
    const height = 100;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const size = 2;
    const widthCount = Math.ceil(width / size);
    const heightCount = Math.ceil(height / size);

    for (let i = 0; i < widthCount; i++) {
      for (let j = 0; j < heightCount; j++) {
        const isBlack = (i + j) % 2 === 0;
        ctx.fillStyle = isBlack ? 'black' : 'white';
        ctx.fillRect(i * size, j * size, size, size);
      }
    }
    return canvas;
  }
}

export const threeUtil = new ThreeUtil();
