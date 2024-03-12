import React from "react";
import type { Metadata } from "next";

import { EditHomeBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Home",
};

const DashboardEditHomePage: React.FC = () => {
  return <EditHomeBlock />;
};

export default DashboardEditHomePage;
