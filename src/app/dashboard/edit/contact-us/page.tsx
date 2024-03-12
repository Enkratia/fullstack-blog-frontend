import React from "react";
import type { Metadata } from "next";

import { EditContactUsSection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Contact us",
};

const DashboardEditContactUsPage: React.FC = () => {
  return <EditContactUsSection1Block />;
};

export default DashboardEditContactUsPage;
