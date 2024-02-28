import React from "react";
import type { Metadata } from "next";

import { EditAboutUsSection1Block } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us: Section1",
};

const EditAboutUsSection1Page: React.FC = () => {
  return (
    <div>
      <EditAboutUsSection1Block />
    </div>
  );
};

export default EditAboutUsSection1Page;
