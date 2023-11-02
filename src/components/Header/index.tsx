import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/img/logo.svg";
import cs from "../../scss/helpers.module.scss"
import s from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <Link href="/" className={s.logoLink}>
          <Image src={Logo} alt="Logo." width={140} height={29} className={s.logo} />
        </Link>

        <nav className={s.nav}>
          <Link href="/"></Link>
        </nav>
      </div>
    </header>
  );
};
