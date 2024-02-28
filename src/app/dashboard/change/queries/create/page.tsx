import React from "react";
import type { Metadata } from "next";

import { ChangeQueriesCreateBlock, DashboardLayout } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create query",
};

const DashboardChangeQueriesCreatePage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeQueriesCreateBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeQueriesCreatePage;
