import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing-page";
import Auth from "./pages/auth-page";
import Layout from "./common/components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout children={<Landing />} />} path="/" />
        <Route element={<Layout children={<Auth />} />} path="/auth/:type" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
