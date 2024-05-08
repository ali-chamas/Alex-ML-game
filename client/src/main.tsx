import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./context/userContext.tsx";
import GamesContextProvider from "./context/gamesContext.tsx";
import DarkModeContextProvider from "./context/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <DarkModeContextProvider>
        <GamesContextProvider>
          <App />
        </GamesContextProvider>
      </DarkModeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
