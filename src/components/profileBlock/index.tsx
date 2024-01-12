"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { useGetUserByIdQuery } from "../../redux/backendApi";
import { ProfileForm } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./profileBlock.module.scss";

export const ProfileBlock: React.FC = () => {
  const { data: session } = useSession();

  const { data: user, isError } = useGetUserByIdQuery(session?.user?.id!, {
    skip: !session?.user?.id,
  });

  if (!user) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Profile</h2>
      <ProfileForm user={user} />
    </section>
  );
};
