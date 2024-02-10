"use client";

import React from "react";

import { useGetPrivacyPolicyQuery } from "../../../redux/backendApi";

import { EditPrivacyPolicySection1Form } from "../../../components";

export const EditPrivacyPolicySection1Block: React.FC = () => {
  const { data, isError: isGetError } = useGetPrivacyPolicyQuery();

  if (!data) {
    return;
  }

  return (
    <>
      <EditPrivacyPolicySection1Form data={data} />
    </>
  );
};
