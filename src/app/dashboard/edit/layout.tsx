// "use client";

import React from "react";

// import cs from "../../../scss/helpers.module.scss";
// import s from "./dashboardEdit.module.scss";

type DashboardEditLayoutProps = {
  children: any;
};

const DashboardEditLayout: React.FC<DashboardEditLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardEditLayout;
