import React from "react";

import cs from "../../scss/helpers.module.scss";
import s from "./accountLayoutBlock.module.scss";

type AccountLayoutBlockProps = {
  children: React.ReactNode;
};

export const AccountLayoutBlock: React.FC<AccountLayoutBlockProps> = ({ children }) => {
  return (
    <main className={s.root}>
      <div className={`${s.container} ${cs.container}`}>{children}</div>
    </main>
  );
};
