import React from "react";
import type { Metadata } from "next";

import { ViewUsersBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Users",
};

const DashboardViewUsersPage: React.FC = () => {
  return (
    <>
      <ViewUsersBlock />
    </>
  );
};

export default DashboardViewUsersPage;
