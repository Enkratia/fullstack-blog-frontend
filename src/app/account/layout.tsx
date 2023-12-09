import React from "react";

import { AccountSidebar } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./accountLayout.module.scss";

type AccountLayoutProps = {
  children: any;
};

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
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

export default AccountLayout;
