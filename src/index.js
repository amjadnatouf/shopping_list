import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Modal from "./modal/Modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const modal = ReactDOM.createRoot(document.getElementById("modal"));
modal.render(
  <React.StrictMode>
    <Modal />
  </React.StrictMode>
);
