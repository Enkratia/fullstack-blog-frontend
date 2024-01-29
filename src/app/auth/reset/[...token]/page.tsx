"use client";

import React from "react";

import { ResetPasswordBlock } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../signin/signin.module.scss";

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
