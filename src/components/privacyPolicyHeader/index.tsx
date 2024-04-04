import React from "react";

import { formatDate2 } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyHeader.module.scss";

type PrivacyPolicyHeaderProps = {
  data: PrivacyPolicyType;
};

export const PrivacyPolicyHeader: React.FC<PrivacyPolicyHeaderProps> = ({ data }) => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Privacy Policy.</h2>

      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <p className={s.title}>Privacy Policy</p>

        <span className={s.update}>{`Last updated on ${formatDate2(data.updatedAt)}`}</span>
      </div>
    </section>
  );
};
