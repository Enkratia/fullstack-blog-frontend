import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditContactUsSection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Contact us",
};

const DashboardEditContactUsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditContactUsSection1Block />
    </DashboardLayout>
  );
};

export default DashboardEditContactUsPage;
