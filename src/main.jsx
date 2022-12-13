import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CollectionGeneratorProvider } from "./contexts/CollectionGenerator";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CollectionGeneratorProvider>
      <App />
    </CollectionGeneratorProvider>
  </React.StrictMode>
);
