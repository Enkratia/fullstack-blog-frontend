import React from "react";
import type { Metadata } from "next";

import { EditAboutUsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us",
};

const DashboardEditAboutUsPage: React.FC = () => {
  return <EditAboutUsBlock />;
};

export default DashboardEditAboutUsPage;
