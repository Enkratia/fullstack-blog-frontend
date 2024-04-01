import React from "react";
import { Metadata } from "next";

import { ActivationBlock } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Email activation",
  description: "Page where you can activate your email address",
};

export default function ActivationPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Activation page</h1>

      <section className={cs.container}>
        <ActivationBlock />
      </section>
    </main>
  );
}
