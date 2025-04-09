import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./services/firebase/firebase";
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./styles/globalStyles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpeedInsights />
    <FirebaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseProvider>
    
  </StrictMode>
);
