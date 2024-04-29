import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg min-h-screen bg-cover bg-center bg-no-repeat">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
