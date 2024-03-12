import React from "react";
import type { Metadata } from "next";

import { ChangeQueriesCreateBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create query",
};

const DashboardChangeQueriesCreatePage: React.FC = () => {
  return <ChangeQueriesCreateBlock />;
};

export default DashboardChangeQueriesCreatePage;
