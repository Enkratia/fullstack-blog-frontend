"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useActivateUserQuery } from "../../redux/backendApi";

import { FRONTEND_URL } from "../../utils/constants";

import s from "./activationBlock.module.scss";
import cs from "../../scss/helpers.module.scss";

const messages = {
  success: "Email successfuly confirmed",
  gone: "Email already confirmed",
  wrong: "Something went wrong...",
};

export const ActivationBlock: React.FC = () => {
  let message = "";
  const router = useRouter();
  const token = useParams().token as string;

  const { isError, error, isSuccess } = useActivateUserQuery({ token });

  React.useEffect(() => {
    if (isSuccess) {
      router.replace(`/auth/signin?callbackUrl=${FRONTEND_URL}`);
    }
  }, [isSuccess]);

  if (isError) {
    if ((error as FetchBaseQueryError)?.status === 410) {
      message = messages.gone;
    } else {
      message = messages.wrong;
    }
  }

  if (isSuccess) {
    message = messages.success;
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h1 className={`${s.title} ${cs.title} ${isError ? s.titleRed : ""}`}>{message}</h1>
      </div>
    </section>
  );
};
