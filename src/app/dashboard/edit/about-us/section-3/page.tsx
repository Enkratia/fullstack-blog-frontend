import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchWhyThisBlogQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditAboutUsSection3Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us: Section3",
};

const EditAboutUsSection3PageSuspense: React.FC = async () => {
  const { data, args } = await fetchWhyThisBlogQuery();

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
      <EditAboutUsSection3Block data={data} />
    </>
  );
};

// **
const EditAboutUsSection3Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditAboutUsSection3PageSuspense />
  </Suspense>
);

export default EditAboutUsSection3Page;
