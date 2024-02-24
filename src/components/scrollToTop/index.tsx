"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "../../utils/customHooks";

import s from "./scrollToTop.module.scss";
import Chevron from "../../../public/img/default/chevron.svg";

const pathnames = ["/blog/economy", "/blog/startup", "/blog/business", "/blog/technology"];

export const ScrollToTop: React.FC = () => {
  const pathname = usePathname();
  const { isMQ1024 } = useMediaQuery();

  const linkRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 250 || document.body.scrollTop > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const onScrollTopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <Link
      href=""
      ref={linkRef}
      onClick={onScrollTopClick}
      className={`${s.scrollTop} ${isVisible ? s.scrollTopVisible : ""} ${
        pathnames.includes(pathname) && !isMQ1024 ? s.scrollTopHigh : ""
      }
      `}
      aria-label="Scroll to top.">
      <Chevron aria-hidden="true" />
    </Link>
  );
};
