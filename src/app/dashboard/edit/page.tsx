import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditBlock } from "../../../components";

export const metadata: Metadata = {
  title: "Edit",
};

const DashboardEditPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditBlock />
    </DashboardLayout>
  );
};

export default DashboardEditPage;
