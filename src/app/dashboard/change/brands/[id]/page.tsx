import React from "react";
import type { Metadata } from "next";

import { ChangeBrandEditBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit brand",
};

type DashboardChangeBrandEditPageProps = {
  params: { id: string };
};

const DashboardChangeBrandEditPage: React.FC<DashboardChangeBrandEditPageProps> = ({
  params: { id },
}) => {
  return <ChangeBrandEditBlock id={id} />;
};

export default DashboardChangeBrandEditPage;
