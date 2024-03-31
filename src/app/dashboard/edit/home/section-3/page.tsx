import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchUsMissionQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditHomeSection3Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: Home: Section 3",
};

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
    <>
      <EditHomeSection3Block data={data} />
    </>
  );
};

// **
const EditHomeSection3Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditHomeSection3PageSuspense />
  </Suspense>
);

export default EditHomeSection3Page;
