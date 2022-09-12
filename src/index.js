import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";

createRoot(document.getElementById("page")).render(<React.StrictMode><App /></React.StrictMode>);

