import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./emailSent.module.scss";
import Email from "../../../../public/img/default/email.svg";

type EmailSentProps = {
  email: string;
};

export const EmailSent: React.FC<EmailSentProps> = ({ email }) => {
  return (
    <div className={s.root}>
      <Email />

      <div className={s.content}>
        <div className={s.main}>
          <p className={`${s.title} ${cs.title}`}>Success!</p>

          <p className={s.descr}>We have sent a link to reset your password to:</p>

          <strong className={s.email}>{email}</strong>
        </div>

        <div className={s.tip}>
          *If you do not see the email in your inbox, please check your spam folder
        </div>
      </div>
    </div>
  );
};
