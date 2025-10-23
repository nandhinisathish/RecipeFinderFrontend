import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProvider from "./context/AppProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
