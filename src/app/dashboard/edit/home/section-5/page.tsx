import React, { Suspense } from "react";

import { fetchWhyWeStartedQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection5Block, SkeletonDashboardForm } from "../../../../../components";

const EditHomeSection5PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchWhyWeStartedQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection5Block data={data} />
    </div>
  );
};

// **
const EditHomeSection5Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection5PageSuspense />
  </Suspense>
);

export default EditHomeSection5Page;
