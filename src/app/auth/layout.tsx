import React from "react";

type AuthLayoutProps = {
  children: any;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
