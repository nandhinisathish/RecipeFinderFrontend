//import AppProvider from "./context/AppContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProvider from "./context/AppProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <BrowserRouter>
        <AppProvider>
        <App />
         <ToastContainer position="top-center" 
         autoClose={5000} 
         hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="center-toast-container" />
    
    </AppProvider>
      </BrowserRouter>
  </StrictMode>
);
