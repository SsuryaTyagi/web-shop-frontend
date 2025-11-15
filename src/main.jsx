import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Context from "./Components/data/Context.jsx";
import ContexTwo from "./Components/data/ContexTwo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Context>
        <ContexTwo>
          <App />
        </ContexTwo>
      </Context>
    </BrowserRouter>
  </StrictMode>
);
