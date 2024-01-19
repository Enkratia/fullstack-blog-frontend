"use client";

import React from "react";

import { SignupBlock } from "../../../components";
import { testRedirect } from "../../../components/_testProtector/actions/action";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
  onAuthLinkClick: (s: string) => void;
};

const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SignupBlock
        callbackUrl={searchParams.callbackUrl}
        // testRedirect={testRedirect}
      />
    </div>
  );
};

export default SignupPage;
