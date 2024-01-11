import React from "react";

import { ActivationBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

type ActivationPageProps = {
  params: {
    token: string;
  };
};

export default function ActivationPage({ params: { token } }: ActivationPageProps) {
  return (
    <main>
      <h1 className={cs.srOnly}>Activation page</h1>
      <ActivationBlock token={token} />
    </main>
  );
}
