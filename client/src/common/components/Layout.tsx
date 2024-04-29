import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="bg">{children}</div>;
};

export default Layout;
