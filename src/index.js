import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import "./lang/i18n";
import { LanguageProvider } from "./context/LangContext";
import store from "../src/store/store";
import { Provider } from "react-redux";
import CatalogueProvider from "./context/CatalogueContext";
import UserLocationProvider from "./context/UserLocation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <CatalogueProvider>
          <UserLocationProvider>
            <App />
          </UserLocationProvider>
        </CatalogueProvider>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
