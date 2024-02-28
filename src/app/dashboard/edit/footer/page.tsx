import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchFooterBottomQuery } from "../../../../fetchApi/fetchApi";

import {
  EditFooterSection1Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Footer",
};

const DashboardEditFooterPageSuspense: React.FC = async () => {
  const { data, args } = await fetchFooterBottomQuery();

  if (!data) {
    return (
      <>
        <SkeletonDashboardForm />
        <ToastComponent type="warning" args={args} text="Failed to load data." />
      </>
    );
  }

  return (
    <div>
      <EditFooterSection1Block data={data} />
    </div>
  );
};

// **
const DashboardEditFooterPage: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <DashboardEditFooterPageSuspense />
  </Suspense>
);

export default DashboardEditFooterPage;
