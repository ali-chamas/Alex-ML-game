import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing-page";
import Auth from "./pages/auth-page";

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<Auth />} path="/auth" />
    </Routes>
  </BrowserRouter>;
};

export default App;
