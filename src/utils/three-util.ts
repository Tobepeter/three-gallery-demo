import { Object3D } from 'three';
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
}

export const threeUtil = new ThreeUtil();
