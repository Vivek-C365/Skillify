import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./services/firebase/firebase";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { inject } from "@vercel/analytics";
import { store, persistor } from "./redux/Store"; // Import persistor
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import "./styles/globalStyles.css";
import App from "./App.jsx";

// Initialize analytics
if (import.meta.env.PROD) {
  inject({
    mode: "production",
    beforeSend: (event) => {
      // Optional: filter or modify events
      return event;
    },
  });
}

createRoot(document.getElementById("root")).render(
  <>
    {import.meta.env.PROD && <SpeedInsights debug={false} />}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
        <FirebaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  </>
);
