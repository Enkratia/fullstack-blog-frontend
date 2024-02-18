import React, { Suspense } from "react";

import { fetchFooterBottomQuery } from "../../../../fetchApi/fetchApi";

import { EditFooterSection1Block, SkeletonDashboardForm } from "../../../../components";

const DashboardEditFooterPageSuspense: React.FC = async () => {
  const { data, isError } = await fetchFooterBottomQuery();

  if (!data) {
    return;
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
