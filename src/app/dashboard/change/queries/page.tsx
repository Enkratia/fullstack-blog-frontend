import React from "react";
import type { Metadata } from "next";

import { ChangeQueriesBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Queries",
};

const DashboardChangeQueriesPage: React.FC = () => {
  return <ChangeQueriesBlock />;
};

export default DashboardChangeQueriesPage;
