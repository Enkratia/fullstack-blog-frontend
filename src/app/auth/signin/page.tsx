import React from "react";
import { Metadata } from "next";

import { SigninBlock } from "../../../components";
import { FRONTEND_URL } from "../../../utils/constants";

import cs from "../../../scss/helpers.module.scss";
import s from "./signin.module.scss";

export const metadata: Metadata = {
  title: "Signin",
};

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
  const callbackUrl = searchParams.callbackUrl || FRONTEND_URL;

  return (
    <main className={s.root}>
      <h1 className={cs.srOnly}>Sign-in page</h1>

      <section className={cs.container}>
        <SigninBlock callbackUrl={callbackUrl} />
      </section>
    </main>
  );
};

export default SigninPage;
