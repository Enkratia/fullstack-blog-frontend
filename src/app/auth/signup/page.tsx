"use client";

import React from "react";

import { SignupBlock } from "../../../components";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SignupPage;
