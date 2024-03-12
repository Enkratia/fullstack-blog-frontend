import React from "react";
import type { Metadata } from "next";

import { ChangeBrandsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Brands",
};

const DashboardChangeBrandsPage: React.FC = () => {
  return <ChangeBrandsBlock />;
};

export default DashboardChangeBrandsPage;
