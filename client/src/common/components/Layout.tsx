import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg min-h-screen bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
};

export default Layout;
