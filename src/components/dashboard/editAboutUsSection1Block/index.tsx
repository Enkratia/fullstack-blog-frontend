import React from "react";

import { fetchAboutUsStaticQuery } from "../../../fetchApi/fetchApi";

import {
  EditAboutUsSection1Form,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../components";

export const EditAboutUsSection1Block: React.FC = async () => {
  const { data, isError, args } = await fetchAboutUsStaticQuery();

  // **
  if (!data || isError) {
    return (
      <>
        <SkeletonDashboardForm />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return <EditAboutUsSection1Form info={data} />;
};
