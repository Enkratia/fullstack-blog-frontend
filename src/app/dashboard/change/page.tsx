import React from "react";
import type { Metadata } from "next";

import { ChangeBlock } from "../../../components";

export const metadata: Metadata = {
  title: "Change",
};

const DashboardChangePage: React.FC = () => {
  return <ChangeBlock />;
};

export default DashboardChangePage;
