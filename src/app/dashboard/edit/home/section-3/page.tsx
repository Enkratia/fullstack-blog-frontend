import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchUsMissionQuery } from "../../../../../fetchApi/fetchApi";

import {
  DashboardLayout,
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
    <div>
      <EditHomeSection3Block data={data} />
    </div>
  );
};

// **
const EditHomeSection3Page: React.FC = async () => (
  <DashboardLayout>
    <Suspense fallback={<SkeletonDashboardForm />}>
      <EditHomeSection3PageSuspense />
    </Suspense>
  </DashboardLayout>
);

export default EditHomeSection3Page;
