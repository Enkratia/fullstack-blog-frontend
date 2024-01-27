"use client";

import React from "react";

import { SigninBlock } from "../../../components";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
  const callbackUrl = searchParams.callbackUrl || FRONTEND_URL;

  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={callbackUrl} />
    </div>
  );
};

export default SigninPage;
