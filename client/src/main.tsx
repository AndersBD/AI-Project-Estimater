import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProjectProvider } from "./context/ProjectContext";

createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <App />
  </ProjectProvider>
);
