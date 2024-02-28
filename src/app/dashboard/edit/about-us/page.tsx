import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditAboutUsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us",
};

const DashboardEditAboutUsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditAboutUsBlock />
    </DashboardLayout>
  );
};

export default DashboardEditAboutUsPage;
