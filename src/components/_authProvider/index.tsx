"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
