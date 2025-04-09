import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./services/firebase/firebase";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { inject } from "@vercel/analytics";

import "./styles/globalStyles.css";
import App from "./App.jsx";

// Initialize analytics
if (import.meta.env.PROD) {
  inject({
    mode: 'production',
    beforeSend: (event) => {
      // Optional: filter or modify events
      return event;
    }
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {import.meta.env.PROD && <SpeedInsights debug={false} />}
    <FirebaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>
);