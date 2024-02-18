import React, { Suspense } from "react";

import { fetchWhyThisBlogQuery } from "../../../../../fetchApi/fetchApi";

import { EditAboutUsSection3Block, SkeletonDashboardForm } from "../../../../../components";

const EditAboutUsSection3PageSuspense: React.FC = async () => {
  const { data, isError } = await fetchWhyThisBlogQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditAboutUsSection3Block data={data} />
    </div>
  );
};

// **
const EditAboutUsSection3Page: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditAboutUsSection3PageSuspense />
  </Suspense>
);

export default EditAboutUsSection3Page;
