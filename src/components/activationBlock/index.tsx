"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useActivateUserQuery } from "../../redux/backendApi";

import s from "./activationBlock.module.scss";
import cs from "../../scss/helpers.module.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ActivationBlockProps = {
  token: string;
};

export const ActivationBlock: React.FC<ActivationBlockProps> = ({ token }) => {
  const router = useRouter();

  const { data, isError, error, status, isSuccess } = useActivateUserQuery({ token });

  if (isError) {
    if ((error as FetchBaseQueryError)?.status === 410) {
      console.log("email already activated");
    } else {
      console.log("something went wrong");
    }
  }

  if (isSuccess) {
    console.log("activated");
  }

  return <div className={`${s.title} ${cs.title}`}>{token}</div>;
};
