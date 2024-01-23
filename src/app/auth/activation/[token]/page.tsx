import React from "react";

import { ActivationBlock } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";

export default function ActivationPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Activation page</h1>
      <ActivationBlock />
    </main>
  );
}
