"use client";

import React from "react";

import { testRedirect } from "../../components/_testProtector/actions/action";
import { AuthLayer } from "../../components";

type AuthLayoutProps = {
  children: any;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <AuthLayer testRedirect={testRedirect}>{children}</AuthLayer>
    </div>
  );
};

export default AuthLayout;
