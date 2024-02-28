import React from "react";
import type { Metadata } from "next";

import { ChangeBrandCreateBlock, DashboardLayout } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create brand",
};

const DashboardChangeBrandCreatePage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeBrandCreateBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeBrandCreatePage;
