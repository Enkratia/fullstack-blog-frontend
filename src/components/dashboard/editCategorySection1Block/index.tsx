import React from "react";

import { fetchCategoryHeaderQuery } from "../../../fetchApi/fetchApi";

import {
  EditCategorySection1Form,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../components";

export const EditCategorySection1Block: React.FC = async () => {
  const { data, isError, args } = await fetchCategoryHeaderQuery();

  //  **
  if (!data || isError) {
    return (
      <>
        <SkeletonDashboardForm />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return <EditCategorySection1Form data={data} />;
};
