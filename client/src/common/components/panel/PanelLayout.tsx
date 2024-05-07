import { ReactNode } from "react";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return <section className="dashboard-bg min-h-screen">{children}</section>;
};

export default PanelLayout;
