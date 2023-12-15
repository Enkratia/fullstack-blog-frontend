"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useMediaQuery } from "../../../utils/customHooks";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signInBtn.module.scss";

type SignBtnProps = {
  className: string;
  onCloseClick: () => void;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className, onCloseClick }) => {
  const { isMQ896 } = useMediaQuery();
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

    onCloseClick();
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

  const onExitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const data = await signOut({ redirect: false });
    router.push(data?.url || FRONTEND_URL);
  };

  return session ? (
    isMQ896 ? (
      <div onClick={onDropdownClick} className={s.root}>
        <button className={`${s.btn} ${className}`}>{session.user.fullname}</button>

        <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
          <li className={s.item}>
            <Link href="/account/profile" className={s.link} prefetch={false}>
              Profile
            </Link>
          </li>
          <li className={s.item}>
            <Link href="/account/add-post" className={s.link} prefetch={false}>
              Add post
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
        className={`${s.btn} ${className}`}
        href="/account/profile"
        prefetch={false}
        scroll={false}>
        {session.user.fullname}
      </Link>
    )
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
