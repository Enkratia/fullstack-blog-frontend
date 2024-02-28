import React from "react";
import type { Metadata } from "next";

import { ChangePostsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Posts",
};

const DashboardChangePostsPage: React.FC = () => {
  return (
    <div>
      <ChangePostsBlock />
    </div>
  );
};

export default DashboardChangePostsPage;
