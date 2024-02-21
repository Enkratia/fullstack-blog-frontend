import React, { Suspense } from "react";

import { fetchUsMissionQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditHomeSection3Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

const EditHomeSection3PageSuspense: React.FC = async () => {
  const { data, args } = await fetchUsMissionQuery();

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
