import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "./AuthContext";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
