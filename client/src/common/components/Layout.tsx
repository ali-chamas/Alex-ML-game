import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg min-h-screen  py-3 px-6 lg:px-20">
      <Navbar />
      <section>{children}</section>
    </div>
  );
};

export default Layout;
