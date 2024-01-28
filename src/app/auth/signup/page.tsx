// "use client";

import React from "react";

import { SignupBlock } from "../../../components";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
  const callbackUrl = searchParams.callbackUrl || FRONTEND_URL;

  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={callbackUrl} />
    </div>
  );
};

export default SignupPage;
