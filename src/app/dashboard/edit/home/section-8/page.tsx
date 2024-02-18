import React, { Suspense } from "react";

import { fetchTestimonialStaticQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection8Block, SkeletonDashboardForm } from "../../../../../components";

const EditHomeSection8PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchTestimonialStaticQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection8Block data={data} />
    </div>
  );
};

// **
const EditHomeSection8Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection8PageSuspense />
  </Suspense>
);

export default EditHomeSection8Page;
