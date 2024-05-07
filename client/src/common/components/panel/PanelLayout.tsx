import { ReactNode } from "react";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  return <section className="dashboard-bg">{children}</section>;
};

export default PanelLayout;
