import React from "react";
import type { Metadata } from "next";

import { ViewMessageBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "View: Message",
};

const DashboardViewMessagePage: React.FC = () => {
  return (
    <>
      <ViewMessageBlock />
    </>
  );
};

export default DashboardViewMessagePage;
