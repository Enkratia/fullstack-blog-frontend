"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type TestProtectorProps = {
  children: any;
  testRedirect: () => void;
};

export const TestProtector: React.FC<TestProtectorProps> = ({ children, testRedirect }) => {
  // const { data: session } = useSession();
  // const pathname = usePathname();

  // const router = useRouter();

  // if (session && pathname.startsWith("/signin")) {
  //   //   console.log(session, pathname.startsWith("/signin"));
  //   const t = window.location.search;
  //   const callbackUrl = new URLSearchParams(t).get("callbackUrl") || process.env.NEXTAUTH_URL!;
  //   // testRedirect();
  //   router.replace(callbackUrl);
  //   return;
  // }

  // console.log("works", Date.now());

  return <>{children}</>;
};
