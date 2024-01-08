import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./confirmEmail.module.scss";
import Email from "../../../../public/img/default/email.svg";

type ConfirmEmailProps = {
  email: string;
  isRegistered: boolean;
};

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ email, isRegistered = false }) => {
  return (
    <div className={`${s.root} ${isRegistered ? s.rootActive : ""}`}>
      <Email />

      <div className={s.content}>
        <div className={s.main}>
          <p className={`${s.title} ${cs.title}`}>Confirm your email</p>

          <p className={s.descr}>
            Confirm your email address by clicking the link in the email we sent to:
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
