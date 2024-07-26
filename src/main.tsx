import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { globalUtil } from "./utils/global-util.ts";
import { threeCanvas } from "./three/three-canvas.ts";

globalUtil.init();
threeCanvas.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
