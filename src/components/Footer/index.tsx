import React from "react";
import { FooterTop, FooterMid, FooterBottom } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <FooterTop />
        <FooterMid />
        <FooterBottom />
      </div>
    </footer>
  );
};
