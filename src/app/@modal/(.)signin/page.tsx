"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { SigninBlock } from "../../../components";

import s from "./signin.module.scss";

type ModalSigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ModalSigninPage: React.FC<ModalSigninPageProps> = ({ searchParams }) => {
  const pathname = usePathname();

  if (!pathname.startsWith("/signin")) {
    return null;
  }

  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default ModalSigninPage;
