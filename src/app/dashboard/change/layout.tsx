import React from "react";

type DashboardChangeLayoutProps = {
  children: any;
};

const DashboardChangeLayout: React.FC<DashboardChangeLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardChangeLayout;
