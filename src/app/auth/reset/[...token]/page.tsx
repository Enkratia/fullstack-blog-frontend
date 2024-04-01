import React from "react";
import { Metadata } from "next";

import { ResetPasswordBlock } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../signin/signin.module.scss";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Page where you can reset your old password and get new one",
};

const ResetPage: React.FC = () => {
  return (
    <main className={s.root}>
      <h1 className={cs.srOnly}>Reset password page</h1>

      <section className={cs.container}>
        <ResetPasswordBlock />
      </section>
    </main>
  );
};

export default ResetPage;
