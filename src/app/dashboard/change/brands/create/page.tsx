import React from "react";
import type { Metadata } from "next";

import { ChangeBrandCreateBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create brand",
};

const DashboardChangeBrandCreatePage: React.FC = () => {
  return (
    <div>
      <ChangeBrandCreateBlock />
    </div>
  );
};

export default DashboardChangeBrandCreatePage;
