import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditCategorySection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Category",
};

const DashboardEditCategoryPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditCategorySection1Block />
    </DashboardLayout>
  );
};

export default DashboardEditCategoryPage;
