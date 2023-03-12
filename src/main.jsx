import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { ContractContextProvider } from "./context/contractContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContractContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ContractContextProvider>
  </React.StrictMode>
);
