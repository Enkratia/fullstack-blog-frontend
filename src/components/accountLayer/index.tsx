import React from "react";

import { AccountSidebar } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./accountLayer.module.scss";

type AccountLayerProps = {
  children: React.ReactNode;
};

export const AccountLayer: React.FC<AccountLayerProps> = ({ children }) => {
  return (
    <main className={s.root}>
      <h1 className={cs.srOnly}>Account</h1>

      <div className={`${s.container} ${cs.container}`}>
        <AccountSidebar />
        {children}
      </div>
    </main>
  );
};
