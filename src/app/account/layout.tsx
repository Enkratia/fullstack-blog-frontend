import React from "react";

import { AccountLayer } from "../../components";

type AccountLayoutProps = {
  children: React.ReactNode;
};

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return <AccountLayer>{children}</AccountLayer>;
};

export default AccountLayout;
