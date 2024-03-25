import React from "react";

import { DashboardLayoutBlock } from "../../components";

type DashboardLayoutProps = {
  children: any;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <DashboardLayoutBlock>{children}</DashboardLayoutBlock>;
};

export default DashboardLayout;
