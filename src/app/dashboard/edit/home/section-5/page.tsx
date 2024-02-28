import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchWhyWeStartedQuery } from "../../../../../fetchApi/fetchApi";

import {
  DashboardLayout,
  EditHomeSection5Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: Home: Section 5",
};

const EditHomeSection5PageSuspense: React.FC = async () => {
  const { data, args } = await fetchWhyWeStartedQuery();

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
      <EditHomeSection5Block data={data} />
    </div>
  );
};

// **
const EditHomeSection5Page: React.FC = async () => (
  <DashboardLayout>
    <Suspense fallback={<SkeletonDashboardForm />}>
      <EditHomeSection5PageSuspense />
    </Suspense>
  </DashboardLayout>
);

export default EditHomeSection5Page;
