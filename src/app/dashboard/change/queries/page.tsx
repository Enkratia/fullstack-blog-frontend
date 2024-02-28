import React from "react";
import type { Metadata } from "next";

import { ChangeQueriesBlock, DashboardLayout } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Queries",
};

const DashboardChangeQueriesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeQueriesBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeQueriesPage;
