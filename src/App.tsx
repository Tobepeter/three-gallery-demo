import { useState } from "react";
import { Home } from "@/pages/home/Home";
import { AppRouter } from "./route";
import "./App.css";
import { globalUtil } from "./utils/global-util";

function App() {
  globalUtil.init();

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
