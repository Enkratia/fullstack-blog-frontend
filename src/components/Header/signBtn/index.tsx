"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signInBtn.module.scss";

type SignBtnProps = {
  className: string;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const [isActive, setIsActive] = React.useState(false);

  // **
  const onDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const dropdown = e.currentTarget;
    setIsActive((b) => !b);

    function hideDropdown(e: MouseEvent) {
      if (dropdown && !e.composedPath().includes(dropdown)) {
        setIsActive(false);
        document.documentElement.removeEventListener("click", hideDropdown);
      }
    }

    document.documentElement.addEventListener("click", hideDropdown);
  };

  const onDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const dropdown = e.currentTarget;

    if (e.key === "Enter") {
      setIsActive((b) => !b);
    }

    function hideDropdown(e: MouseEvent) {
      if (dropdown && !e.composedPath().includes(dropdown)) {
        setIsActive(false);
        document.documentElement.removeEventListener("click", hideDropdown);
      }
    }

    document.documentElement.addEventListener("click", hideDropdown);
  };

  return session ? (
    <div onClick={onDropdownClick} onKeyDown={onDropdownKeyDown} className={s.root}>
      <button className={`${s.btn} ${className}`}>{session.user.fullname}</button>

      <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
        <li className={s.item}>
          <Link href="account/profile" className={s.link}>
            Profile
          </Link>
        </li>
        <li className={s.item}>
          <Link href="account/add-post" className={s.link}>
            Add new post
          </Link>
        </li>
        <li className={s.item}>
          <Link href="/" className={s.link}>
            Exit
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      href={`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}
      className={className}>
      Sign-in/up
    </Link>
  );
};
