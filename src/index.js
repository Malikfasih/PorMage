import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProjectProvider } from "./context/projects";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/modal";
import { ManagerProvider } from "./context/manager";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <ManagerProvider>
        <ProjectProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProjectProvider>
      </ManagerProvider>
    </ModalProvider>
  </React.StrictMode>
);

reportWebVitals();
