"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { ModalPC, SigninBlock } from "../../../components";

type ModalSigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ModalSigninPage: React.FC<ModalSigninPageProps> = ({ searchParams }) => {
  const pathname = usePathname();

  if (!pathname.startsWith("/signin")) {
    return null;
  }

  return (
    <ModalPC callbackUrl={searchParams.callbackUrl}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </ModalPC>
  );
};

export default ModalSigninPage;
