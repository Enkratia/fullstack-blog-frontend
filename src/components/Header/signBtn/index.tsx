"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signInBtn.module.scss";

type SignBtnProps = {
  className: string;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className }) => {
  const router = useRouter();

  const { data: session } = useSession();
  const pathname = usePathname();
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const [isActive, setIsActive] = React.useState(false);

  // **
  const onSignClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!!pathname.match(/(\/signin|\/signup)/)) {
      e.preventDefault();
    }
  };

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

  const onExitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const data = await signOut({ redirect: false });

    router.push(data?.url || FRONTEND_URL);
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
          <Link onClick={onExitClick} href="/" className={s.link}>
            Exit
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      onClick={onSignClick}
      className={className}
      href={`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}>
      Sign-in/up
    </Link>
  );
};
