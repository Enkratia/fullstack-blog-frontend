import React from "react";

import s from "./FooterMid.module.scss";
import cs from "../../../scss/helpers.module.scss";

export const FooterMid: React.FC = () => {
  return (
    <div className={s.root}>
      <h2 className={cs.srOnly}>Form to subscribe for lastest updates</h2>
      <p className={`${s.title} ${cs.title}`}>
        Subscribe to&nbsp;our news letter to&nbsp;get latest updates and news
      </p>

      <form className={s.form}>
        <input type="text" placeholder="Enter Your Email" className={s.input} />
        <button type="submit" className={`${s.btn} ${cs.btn}`}>
          Subscribe
        </button>
      </form>
    </div>
  );
};
