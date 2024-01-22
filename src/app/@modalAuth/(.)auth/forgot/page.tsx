"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { FRONTEND_URL } from "../../../../utils/constants";
import { ModalPA, SignupBlock } from "../../../../components";

const ModalForgotPasswordPage: React.FC = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") || FRONTEND_URL;

  return (
    <ModalPA callbackUrl={callbackUrl}>
      <SignupBlock callbackUrl={callbackUrl} />
    </ModalPA>
  );
};

export default ModalForgotPasswordPage;
