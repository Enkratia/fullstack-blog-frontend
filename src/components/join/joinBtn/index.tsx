"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { FRONTEND_URL } from "../../../utils/constants";

import cs from "../../../scss/helpers.module.scss";
import s from "./joinBtn.module.scss";

export const JoinBtn: React.FC = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const sP = useSearchParams();
  const callbackUrl = `callbackUrl=${FRONTEND_URL + pathname + sP}`;

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (session) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={`/auth/signin?${callbackUrl}`}
      scroll={false}
      onClick={onLinkClick}
      className={`${s.btn} ${cs.btn}`}>
      Join Now
    </Link>
  );
};
