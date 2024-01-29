import React from "react";

import { ForgotBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "../signin/signin.module.scss";

type ForgotPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const ForgotPage: React.FC<ForgotPageProps> = ({ searchParams }) => {
  return (
    <main className={s.root}>
      <h1 className={cs.srOnly}>Forget password page</h1>

      <section className={cs.container}>
        <ForgotBlock callbackUrl={searchParams.callbackUrl} />
      </section>
    </main>
  );
};

export default ForgotPage;
