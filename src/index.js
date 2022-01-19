import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import "@themesberg/flowbite";
import { ThemeProvider } from "./components/context/ThemeContext.js";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
