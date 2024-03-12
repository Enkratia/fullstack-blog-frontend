import React from "react";
import type { Metadata } from "next";

import { EditCategorySection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Category",
};

const DashboardEditCategoryPage: React.FC = () => {
  return <EditCategorySection1Block />;
};

export default DashboardEditCategoryPage;
