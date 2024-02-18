import React, { Suspense } from "react";

import { fetchCategoryDescriptionQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection4Block, SkeletonDashboardForm } from "../../../../../components";

const EditHomeSection4PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchCategoryDescriptionQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection4Block data={data} />
    </div>
  );
};

// **
const EditHomeSection4Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection4PageSuspense />
  </Suspense>
);

export default EditHomeSection4Page;
