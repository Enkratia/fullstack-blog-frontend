"use client";

import React from "react";
// import { usePathname } from "next/navigation";

type ModalAuthLayoutProps = {
  children: any;
};

const ModalAuthLayout: React.FC<ModalAuthLayoutProps> = ({ children }) => {
  // const pathname = usePathname();
  // const modalAuthPathname = /^\/auth\/(signin|signup|forgot)/;

  // if (!pathname.match(modalAuthPathname)) {
  //   return null;
  // }

  return <div>{children}</div>;
};

export default ModalAuthLayout;
