import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="dashboard-bg min-h-screen flex">
      <Sidebar />
      {children}
    </section>
  );
};

export default PanelLayout;
