"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { FRONTEND_URL } from "../../../../utils/constants";
import { ModalPA, SigninBlock } from "../../../../components";

const ModalSigninPage: React.FC = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") || FRONTEND_URL;

  return (
    <ModalPA callbackUrl={callbackUrl}>
      <SigninBlock callbackUrl={callbackUrl} />
    </ModalPA>
  );
};

export default ModalSigninPage;
