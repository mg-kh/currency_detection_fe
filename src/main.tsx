import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalProvider from "./providers/GlobalProvider.tsx";
import { ColorSchemeScript } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
    <ColorSchemeScript />
  </StrictMode>,
);
