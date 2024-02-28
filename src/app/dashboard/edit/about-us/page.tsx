import React from "react";
import { Metadata } from "next";

import { EditAboutUsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us",
};

const DashboardEditAboutUsPage: React.FC = () => {
  return (
    <div>
      <EditAboutUsBlock />
    </div>
  );
};

export default DashboardEditAboutUsPage;
