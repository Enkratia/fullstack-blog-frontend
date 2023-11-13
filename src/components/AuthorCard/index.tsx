import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./AuthorCard.module.scss";

type Author = {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  profession: string;
  company: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
};

// type AuthorCardProps = {
//   author: Author;
// };

type AuthorCardProps = {
  test: string;
};

export const AuthorCard: React.FC<AuthorCardProps> = ({ test }) => {
  return <article className={s.root}>{test}</article>;
};
