import React from "react";

type DashboardEditLayoutProps = {
  children: any;
};

const DashboardEditLayout: React.FC<DashboardEditLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardEditLayout;
