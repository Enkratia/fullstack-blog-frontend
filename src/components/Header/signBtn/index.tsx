"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useMediaQuery, useReinitApp } from "../../../utils/customHooks";
import { revaldatePathAction } from "../../..//utils/actions";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signInBtn.module.scss";

type SignBtnProps = {
  className: string;
  onCloseClick: () => void;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className, onCloseClick }) => {
  const router = useRouter();
  const reinitApp = useReinitApp();
  const { isMQ896 } = useMediaQuery();

  const { data: session } = useSession();
  const pathname = usePathname();
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const [isActive, setIsActive] = React.useState(false);

  // **
  const onSignClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Чтобы не переходить @modalLogin/@modalSignup, если signup/signin уже открыт
    if (pathname.startsWith("/auth")) {
      e.preventDefault();
    }

    // Чтобы закрывалось модальное окно nav-меню, перед открытием @modalLogin/@modalSignup
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
    await signOut({
      redirect: false,
    });

    revaldatePathAction();
    reinitApp();
    router.push(window.location.href);
  };

  return session ? (
    isMQ896 ? (
      <div onClick={onDropdownClick} className={s.root}>
        <button className={`${s.btn} ${className}`}>{session.user.fullname}</button>

        <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
          <li className={s.item}>
            <Link href="/account/profile" className={s.link}>
              Profile
            </Link>
          </li>
          <li className={s.item}>
            <Link href="/account/add-post" className={s.link}>
              Add post
            </Link>
          </li>
          <li className={s.item}>
            <Link href="/account/my-posts" className={s.link}>
              My posts
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
        onClick={onCloseClick}
        className={`${s.btn} ${className}`}
        href="/account/profile"
        scroll={false}>
        {session.user.fullname}
      </Link>
    )
  ) : (
    <Link
      onClick={onSignClick}
      className={className}
      href={`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}>
      Sign-in/up
    </Link>
  );
};
