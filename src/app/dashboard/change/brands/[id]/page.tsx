import React from "react";
import type { Metadata } from "next";

import { ChangeBrandEditBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit brand",
};

const DashboardChangeBrandEditPage: React.FC = () => {
  return <ChangeBrandEditBlock />;
};

export default DashboardChangeBrandEditPage;
