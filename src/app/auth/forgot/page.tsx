import React from "react";

import { SignupBlock } from "../../../components";

import s from "../signin/signin.module.scss";

type ForgotPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ForgotPage: React.FC<ForgotPageProps> = ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default ForgotPage;
