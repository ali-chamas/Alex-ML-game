import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const PanelLayout = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  return (
    <section className="dashboard-bg min-h-screen flex">
      <Sidebar type={type} />
      {children}
    </section>
  );
};

export default PanelLayout;
