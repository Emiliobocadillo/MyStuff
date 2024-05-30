import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ItemsProvider } from "./context/ItemsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </AuthProvider>
  </BrowserRouter>
);
