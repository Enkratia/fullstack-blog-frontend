import React from "react";

import { SigninBlock } from "../../../components";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;
