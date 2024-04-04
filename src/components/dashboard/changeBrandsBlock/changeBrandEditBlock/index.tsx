import React, { Suspense } from "react";

import { fetchBrandByIdQuery } from "../../../../fetchApi/fetchApi";

import { ChangeBrandEditForm, SkeletonDashboardForm, ToastComponent } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeBrandEditBlock.module.scss";

type ChangeBrandEditBlockProps = {
  id: string;
};

const ChangeBrandEditBlockSuspense: React.FC<ChangeBrandEditBlockProps> = async ({ id }) => {
  const { data, isError, args } = await fetchBrandByIdQuery(+id);

  if (!data || isError) {
    return (
      <>
        <SkeletonDashboardForm />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Edit brand</h2>

      <ChangeBrandEditForm data={data} />
    </section>
  );
};

// **
export const ChangeBrandEditBlock: React.FC<ChangeBrandEditBlockProps> = ({ id }) => (
  <Suspense fallback={<SkeletonDashboardForm />}>
    <ChangeBrandEditBlockSuspense id={id} />
  </Suspense>
);
