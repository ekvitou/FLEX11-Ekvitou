import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store/store";
import {AuthProvider} from "./context/AuthContext"; 

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            {" "}
            {/* ✅ Wrap App inside AuthProvider */}
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Root element not found.");
}
