import React from "react";
import type { Metadata } from "next";

import { ChangeBrandsBlock, DashboardLayout } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Brands",
};

const DashboardChangeBrandsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeBrandsBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeBrandsPage;
