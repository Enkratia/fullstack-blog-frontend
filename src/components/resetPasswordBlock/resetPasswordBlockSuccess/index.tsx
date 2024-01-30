import React from "react";
import Link from "next/link";

import cs from "../../../scss/helpers.module.scss";
import s from "./resetPasswordBlockSuccess.module.scss";

export const ResetPasswordBlockSuccess: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.main}>
          <p className={`${s.title} ${cs.title}`}>Password changed</p>

          <p className={s.descr}>You can now sign in to your account with your new password.</p>

          <Link href={`/auth/signin`} className={`${s.btn} ${cs.btn}`}>
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};
