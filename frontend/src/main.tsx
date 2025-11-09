import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // базовые стили (можно оставить импорт из src)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
