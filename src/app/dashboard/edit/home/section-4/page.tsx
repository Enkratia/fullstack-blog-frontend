import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchCategoryDescriptionQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditHomeSection4Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: Home: Section 4",
};

const EditHomeSection4PageSuspense: React.FC = async () => {
  const { data, args } = await fetchCategoryDescriptionQuery();

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
