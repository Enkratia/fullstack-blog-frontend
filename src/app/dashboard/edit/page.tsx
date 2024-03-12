import React from "react";
import type { Metadata } from "next";

import { EditBlock } from "../../../components";

export const metadata: Metadata = {
  title: "Edit",
};

const DashboardEditPage: React.FC = () => {
  return <EditBlock />;
};

export default DashboardEditPage;
