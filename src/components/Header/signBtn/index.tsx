"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { FRONTEND_URL } from "../../../utils/constants";

type SignBtnProps = {
  className: string;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  console.log(session);

  return session ? (
    <div>{session.user.email}</div>
  ) : (
    <Link
      href={`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}
      className={className}>
      Sign-in/up
    </Link>
  );
};
