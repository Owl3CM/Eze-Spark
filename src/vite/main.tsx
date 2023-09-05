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
    <ProviderContainer />
    <ToggleTheme />
  </BrowserRouter>
);
