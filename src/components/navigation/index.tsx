import React from "react";
import Link from "next/link";

import s from "./navigation.module.scss";

export interface NavigationProps {
  onPrevClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onNextClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  page: number;
  totalPages: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  onPrevClick,
  onNextClick,
  page,
  totalPages,
}) => {
  return (
    <div className={s.root}>
      <Link
        onClick={onPrevClick}
        href=""
        className={`${s.link} ${page === 1 ? s.linkInactive : ""}`}>{`< Prev`}</Link>

      <Link
        onClick={onNextClick}
        href=""
        className={`${s.link} ${page === totalPages ? s.linkInactive : ""}`}>{`Next >`}</Link>
    </div>
  );
};
