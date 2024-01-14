"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useUnsubscribeQuery } from "../../redux/backendApi";

import cs from "../../scss/helpers.module.scss";
import s from "./unsubscribeBlock.module.scss";

const messages = {
  success: "Email successfuly unsubscribed",
  gone: "Email already unsubscribed",
  wrong: "Something went wrong...",
};

type UnsubscribeBlockProps = {
  token: string;
};

export const UnsubscribeBlock: React.FC<UnsubscribeBlockProps> = ({ token }) => {
  let message = "";
  const router = useRouter();

  const { isError, error, isSuccess } = useUnsubscribeQuery({ token });

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
