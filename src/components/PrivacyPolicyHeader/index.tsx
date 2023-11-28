import React from "react";

import { formatDate2 } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyHeader.module.scss";

const policy: PrivacyPolicyType = {
  message: "",
  createdAt: "2023-11-25T16:48:55.329Z",
  updatedAt: "2023-11-25T16:48:55.329Z",
};

export const PrivacyPolicyHeader: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Privacy Policy.</h2>

      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <p className={s.title}>Privacy Policy</p>

        <span className={s.update}>{`Last updated on ${formatDate2(policy.updatedAt)}`}</span>
      </div>
    </section>
  );
};
