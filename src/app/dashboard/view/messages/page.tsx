import React from "react";
import type { Metadata } from "next";

import { ViewMessagesBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Messages",
};

const DashboardViewMessagesPage: React.FC = () => {
  return <ViewMessagesBlock />;
};

export default DashboardViewMessagesPage;
