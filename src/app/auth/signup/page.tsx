import React from "react";

import { SignupBlock } from "../../../components";
import { FRONTEND_URL } from "../../../utils/constants";

import cs from "../../../scss/helpers.module.scss";
import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
  const callbackUrl = searchParams.callbackUrl || FRONTEND_URL;

  return (
    <main className={s.root}>
      <h1 className={cs.srOnly}>Sign-up page</h1>

      <section className={cs.container}>
        <SignupBlock callbackUrl={callbackUrl} />
      </section>
    </main>
  );
};

export default SignupPage;
