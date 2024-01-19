"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { FRONTEND_URL } from "../../../../utils/constants";
import { ModalPA, SignupBlock } from "../../../../components";

const ModalSignupPage: React.FC = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") || FRONTEND_URL;

  return (
    <ModalPA callbackUrl={callbackUrl}>
      <SignupBlock callbackUrl={callbackUrl} />
    </ModalPA>
  );
};

export default ModalSignupPage;
