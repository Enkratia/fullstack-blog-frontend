import React from "react";

type DashboardViewLayoutProps = {
  children: any;
};

const DashboardViewLayout: React.FC<DashboardViewLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardViewLayout;
