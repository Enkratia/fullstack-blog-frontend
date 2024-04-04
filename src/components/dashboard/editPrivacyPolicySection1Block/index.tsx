import React, { Suspense } from "react";

import { fetchPrivacyPolicyQuery } from "../../../fetchApi/fetchApi";

import {
  EditPrivacyPolicySection1Form,
  SkeletonDashboardPrivacyPolicy,
  ToastComponent,
} from "../../../components";

const EditPrivacyPolicySection1BlockSuspense: React.FC = async () => {
  const { data, isError, args } = await fetchPrivacyPolicyQuery();

  if (!data || isError) {
    return (
      <>
        <SkeletonDashboardPrivacyPolicy />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return <EditPrivacyPolicySection1Form data={data} />;
};

export const EditPrivacyPolicySection1Block: React.FC = () => (
  <Suspense fallback={<SkeletonDashboardPrivacyPolicy />}>
    <EditPrivacyPolicySection1BlockSuspense />
  </Suspense>
);
