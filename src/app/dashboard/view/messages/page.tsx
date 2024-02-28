import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, ViewMessagesBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Messages",
};

const DashboardViewMessagesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ViewMessagesBlock />
    </DashboardLayout>
  );
};

export default DashboardViewMessagesPage;
