"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { ModalPC, SignupBlock } from "../../../components";

type ModalSignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ModalSignupPage: React.FC<ModalSignupPageProps> = ({ searchParams }) => {
  const pathname = usePathname();

  if (!pathname.startsWith("/signup")) {
    return null;
  }

  return (
    <ModalPC callbackUrl={searchParams.callbackUrl}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </ModalPC>
  );
};

export default ModalSignupPage;
