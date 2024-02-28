import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, ViewUsersBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Users",
};

const DashboardViewUsersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ViewUsersBlock />
    </DashboardLayout>
  );
};

export default DashboardViewUsersPage;
