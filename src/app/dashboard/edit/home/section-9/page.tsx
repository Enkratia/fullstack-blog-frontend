import React, { Suspense } from "react";

import { fetchJoinQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditHomeSection9Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

const EditHomeSection9PageSuspense: React.FC = async () => {
  const { data, args } = await fetchJoinQuery();

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
      <EditHomeSection9Block data={data} />
    </div>
  );
};

// **
const EditHomeSection9Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection9PageSuspense />
  </Suspense>
);

export default EditHomeSection9Page;
