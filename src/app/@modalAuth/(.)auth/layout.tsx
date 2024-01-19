"use client";

import React from "react";
import { usePathname } from "next/navigation";

type ModalAuthLayoutProps = {
  children: any;
};

const ModalAuthLayout: React.FC<ModalAuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  if (!pathname.startsWith("/auth")) {
    return null;
  }

  return <div>{children}</div>;
};

export default ModalAuthLayout;
