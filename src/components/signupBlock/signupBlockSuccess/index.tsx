import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./signupBlockSuccess.module.scss";
import Email from "../../../../public/img/default/email.svg";

type SignupBlockSuccessProps = {
  email: string;
};

export const SignupBlockSuccess: React.FC<SignupBlockSuccessProps> = ({ email }) => {
  return (
    <div className={s.root}>
      <Email />

      <div className={s.content}>
        <div className={s.main}>
          <p className={`${s.title} ${cs.title}`}>Confirm your email</p>

          <p className={s.descr}>
            Confirm your email address by&nbsp;clicking the link in&nbsp;the email
            we&nbsp;sent&nbsp;to:
          </p>

          <strong className={s.email}>{email}</strong>
        </div>

        <div className={s.tip}>
          *If you do not see the email in your inbox, please check your spam folder
        </div>
      </div>
    </div>
  );
};
