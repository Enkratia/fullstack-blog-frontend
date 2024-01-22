import React from "react";

import { SignupBlock } from "../../../components";

import s from "../signin/signin.module.scss";

type ForgotPasswordPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default ForgotPasswordPage;
