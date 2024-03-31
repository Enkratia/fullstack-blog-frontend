import React, { Suspense } from "react";

import {
  EditContactUsSection1Form,
  SkeletonDashboardForm,
  ToastComponent,
} from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

import { fetchContactUsQuery } from "../../../fetchApi/fetchApi";

const EditContactUsSection1BlockSuspense: React.FC = async () => {
  const { data, isError, args } = await fetchContactUsQuery();

  if (!data || isError) {
    return (
      <>
        <SkeletonDashboardForm />
        <ToastComponent type="warning" args={args} text="Failed to load data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Contact us</h2>

      <EditContactUsSection1Form info={data} />
    </section>
  );
};

export const EditContactUsSection1Block: React.FC = async () => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <EditContactUsSection1BlockSuspense />
  </Suspense>
);
