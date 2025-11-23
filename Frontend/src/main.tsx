import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./styles/index.css";
import Home from "./pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
