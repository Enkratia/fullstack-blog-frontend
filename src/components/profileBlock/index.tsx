"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { useGetUserByIdQuery } from "../../redux/backendApi";
import { setToast } from "../../redux/toastSlice/slice";
import { useAppDispatch } from "../../redux/store";

import { ProfileForm, SkeletonProfileForm } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./profileBlock.module.scss";

export const ProfileBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const {
    data: user,
    isError,
    originalArgs,
    endpointName,
  } = useGetUserByIdQuery(session?.user?.id!, {
    skip: !session?.user?.id,
  });

  // **
  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load profile data.",
        }),
      );
    }
  }, [isError]);

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Profile</h2>

      {!user ? <SkeletonProfileForm /> : <ProfileForm user={user} />}
    </section>
  );
};
