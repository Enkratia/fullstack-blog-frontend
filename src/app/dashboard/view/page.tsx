import React from "react";
import type { Metadata } from "next";

import { ViewBlock } from "../../../components";

export const metadata: Metadata = {
  title: "View",
};

const DashboardViewPage: React.FC = () => {
  return <ViewBlock />;
};

export default DashboardViewPage;
