import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditHomeBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Home",
};

const DashboardEditHomePage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditHomeBlock />
    </DashboardLayout>
  );
};

export default DashboardEditHomePage;
