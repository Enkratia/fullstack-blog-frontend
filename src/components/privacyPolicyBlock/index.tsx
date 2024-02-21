"use client";

import React from "react";

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { useGetPrivacyPolicyQuery } from "../../redux/backendApi";
import { setToast } from "../../redux/toastSlice/slice";
import { useAppDispatch } from "../../redux/store";

import { SkeletonPrivacyPolicy } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyBlock.module.scss";

export const PrivacyPolicyBlock: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, isError, originalArgs, endpointName } = useGetPrivacyPolicyQuery();
  const policy = data?.message;

  // **
  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load some data.",
        }),
      );
    }
  }, [isError]);

  // **
  const html = React.useMemo(() => {
    if (!policy) return "";

    return generateHTML(JSON.parse(policy), [StarterKit, Underline]);
  }, [policy]);

  // **
  if (!policy) {
    return <SkeletonPrivacyPolicy />;
  }

  return (
    <section className={s.root}>
      <article
        className={`${cs.article} ${cs.container} ${cs.container768}`}
        dangerouslySetInnerHTML={{ __html: html }}></article>
    </section>
  );
};
