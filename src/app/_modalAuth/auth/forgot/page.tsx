"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { FRONTEND_URL } from "../../../../utils/constants";
import { ModalPA, ForgotBlock } from "../../../../components";

const ModalForgotPage: React.FC = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") || FRONTEND_URL;

  return (
    <ModalPA callbackUrl={callbackUrl}>
      <ForgotBlock callbackUrl={callbackUrl} />
    </ModalPA>
  );
};

export default ModalForgotPage;
