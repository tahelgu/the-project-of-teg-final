import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./context/ThemeContext";
import UserProvider from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
        <ToastContainer position="top-center" autoClose={2500} />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
