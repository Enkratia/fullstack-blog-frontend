import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditAboutUsSection1Block } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us: Section1",
};

const EditAboutUsSection1Page: React.FC = () => {
  return (
    <DashboardLayout>
      <EditAboutUsSection1Block />
    </DashboardLayout>
  );
};

export default EditAboutUsSection1Page;
