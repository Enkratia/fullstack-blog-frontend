import React, { Suspense } from "react";

import { fetchTestimonialStaticQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditHomeSection8Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

const EditHomeSection8PageSuspense: React.FC = async () => {
  const { data, args } = await fetchTestimonialStaticQuery();

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
