import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./index.js";
import "./app.less";


const domNode = document.querySelector("body");
const root = createRoot(domNode);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);