import React from "react";
import type { Metadata } from "next";

import { ChangeBrandEditBlock, DashboardLayout } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit brand",
};

const DashboardChangeBrandEditPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeBrandEditBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeBrandEditPage;
