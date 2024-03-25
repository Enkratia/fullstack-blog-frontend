import React from "react";

import { AccountSidebar, AccountLayoutBlock } from "../../components";

type AccountLayoutProps = {
  children: any;
};

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <AccountLayoutBlock>
      <AccountSidebar />
      {children}
    </AccountLayoutBlock>
  );
};

export default AccountLayout;
