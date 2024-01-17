"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FRONTEND_URL } from "../../../utils/constants";
import { ModalPA, SigninBlock } from "../../../components";

const ModalSigninPage: React.FC = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") || FRONTEND_URL;
  const pathname = usePathname();

  console.log("modalsignin");

  // const { data: session } = useSession();
  // if (session) {
  //   return null;
  // }

  if (!pathname.startsWith("/signin")) {
    return null;
  }

  return (
    <ModalPA callbackUrl={callbackUrl}>
      <SigninBlock callbackUrl={callbackUrl} />
    </ModalPA>
  );
};

export default ModalSigninPage;
