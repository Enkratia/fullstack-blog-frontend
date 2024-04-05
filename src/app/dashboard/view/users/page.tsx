// import React from "react";
// import type { Metadata } from "next";

// import { ViewUsersBlock } from "../../../../components";

// export const metadata: Metadata = {
//   title: "View: Users",
// };

// const DashboardViewUsersPage: React.FC = () => {
//   return <ViewUsersBlock />;
// };

// export default DashboardViewUsersPage;

import React from "react";
import type { Metadata } from "next";

import { ViewUsersBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Users",
};

type DashboardViewUsersPage = {
  searchParams: Record<string, string>;
};

const DashboardViewUsersPage: React.FC<DashboardViewUsersPage> = async () => {
  return <ViewUsersBlock />;
};

export default DashboardViewUsersPage;
