"use client";

import React from "react";

import { SigninBlock } from "../../../components";
import { testRedirect } from "../../../components/_testProtector/actions/action";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SigninBlock
        callbackUrl={searchParams.callbackUrl}
        // testRedirect={testRedirect}
      />
    </div>
  );
};

export default SigninPage;
