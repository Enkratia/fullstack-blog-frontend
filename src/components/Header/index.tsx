import React from "react";
import Link from "next/link";

import { ModalR, Nav, OpenMenuBtn } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./header.module.scss";
import Logo from "../../../public/img/logo.svg";

export const Header: React.FC = () => {
  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <div className={`${s.container} ${cs.container}`}>
          <Link href="/" className={s.logoLink} aria-label="Go to home page.">
            <Logo className={s.logo} aria-hidden="true" />
          </Link>

          <OpenMenuBtn />

          <ModalR>
            <Nav />
          </ModalR>

          <Link href="#subscribe-form" className={`${cs.btn} ${cs.btnWhite}`}>
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
};
