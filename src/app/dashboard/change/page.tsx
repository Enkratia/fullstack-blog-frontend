import React from "react";
import type { Metadata } from "next";

import { ChangeBlock, DashboardLayout } from "../../../components";

export const metadata: Metadata = {
  title: "Change",
};

const DashboardChangePage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeBlock />
    </DashboardLayout>
  );
};

export default DashboardChangePage;
