import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, ViewMessageBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "View: Message",
};

const DashboardViewMessagePage: React.FC = () => {
  return (
    <DashboardLayout>
      <ViewMessageBlock />
    </DashboardLayout>
  );
};

export default DashboardViewMessagePage;
