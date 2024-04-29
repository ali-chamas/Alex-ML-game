import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing-page";

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route element={<Landing />} path="/" />
    </Routes>
  </BrowserRouter>;
};

export default App;
