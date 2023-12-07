"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { ModalPA, SigninBlock } from "../../../components";

type ModalSigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ModalSigninPage: React.FC<ModalSigninPageProps> = ({ searchParams }) => {
  const pathname = usePathname();

  if (!pathname.startsWith("/signin")) {
    return null;
  }

  return (
    <ModalPA callbackUrl={searchParams.callbackUrl}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </ModalPA>
  );
};

export default ModalSigninPage;
