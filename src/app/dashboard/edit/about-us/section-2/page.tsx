import React, { Suspense } from "react";

import { fetchKnowMoreQuery } from "../../../../../fetchApi/fetchApi";

import {
  EditAboutUsSection2Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

const EditAboutUsSection2PageSuspense: React.FC = async () => {
  const { data, args } = await fetchKnowMoreQuery();

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
      <EditAboutUsSection2Block data={data} />
    </>
  );
};

// **
const EditAboutUsSection2Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditAboutUsSection2PageSuspense />
  </Suspense>
);

export default EditAboutUsSection2Page;
