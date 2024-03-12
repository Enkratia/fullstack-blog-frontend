import { Metadata } from "next";
import React from "react";

import { DashboardBlock } from "../../components";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage: React.FC = () => {
  return <DashboardBlock />;
};

export default DashboardPage;
