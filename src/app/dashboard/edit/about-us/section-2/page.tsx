import React, { Suspense } from "react";
import type { Metadata } from "next";

import { fetchKnowMoreQuery } from "../../../../../fetchApi/fetchApi";

import {
  DashboardLayout,
  EditAboutUsSection2Block,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit: About us: Section2",
};

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

  return <EditAboutUsSection2Block data={data} />;
};

// **
const EditAboutUsSection2Page: React.FC = async () => (
  <DashboardLayout>
    <Suspense fallback={<SkeletonDashboardForm />}>
      <EditAboutUsSection2PageSuspense />
    </Suspense>
  </DashboardLayout>
);

export default EditAboutUsSection2Page;
