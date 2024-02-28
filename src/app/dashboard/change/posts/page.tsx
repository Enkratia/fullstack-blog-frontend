import React from "react";
import type { Metadata } from "next";

import { ChangePostsBlock, DashboardLayout } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Posts",
};

const DashboardChangePostsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangePostsBlock />
    </DashboardLayout>
  );
};

export default DashboardChangePostsPage;
