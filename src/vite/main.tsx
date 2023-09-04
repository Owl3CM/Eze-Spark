import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProviderContainer } from "../lib";
import ToggleTheme from "./ToggleTheme";
import React from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
    <ProviderContainer animationTime={300} childClass="child-class" overlayClass="overlay-class" />
    <ToggleTheme />
  </BrowserRouter>
);
