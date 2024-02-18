import React, { Suspense } from "react";

import { fetchKnowMoreQuery } from "../../../../../fetchApi/fetchApi";

import { EditAboutUsSection2Block, SkeletonDashboardForm } from "../../../../../components";

const EditAboutUsSection2PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchKnowMoreQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditAboutUsSection2Block data={data} />
    </div>
  );
};

// **
const EditAboutUsSection2Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditAboutUsSection2PageSuspense />
  </Suspense>
);

export default EditAboutUsSection2Page;
