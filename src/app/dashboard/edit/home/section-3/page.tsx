import React, { Suspense } from "react";

import { fetchUsMissionQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection3Block, SkeletonDashboardForm } from "../../../../../components";

const EditHomeSection3PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchUsMissionQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection3Block data={data} />
    </div>
  );
};

// **
const EditHomeSection3Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection3PageSuspense />
  </Suspense>
);

export default EditHomeSection3Page;
