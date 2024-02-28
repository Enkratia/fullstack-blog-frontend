import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, ViewBlock } from "../../../components";

export const metadata: Metadata = {
  title: "View",
};

const DashboardViewPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ViewBlock />
    </DashboardLayout>
  );
};

export default DashboardViewPage;
