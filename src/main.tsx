// @ts-ignore
import React from 'react'
import App from './App.tsx'
import './globals.css'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);

root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ,
)
