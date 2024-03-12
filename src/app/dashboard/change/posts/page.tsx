import React from "react";
import type { Metadata } from "next";

import { ChangePostsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Posts",
};

const DashboardChangePostsPage: React.FC = () => {
  return <ChangePostsBlock />;
};

export default DashboardChangePostsPage;
