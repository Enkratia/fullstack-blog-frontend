"use client";

import React from "react";

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { useGetPrivacyPolicyQuery } from "../../redux/backendApi";

import { SkeletonPrivacyPolicy } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyBlock.module.scss";

export const PrivacyPolicyBlock: React.FC = () => {
  const { data, isError } = useGetPrivacyPolicyQuery();
  const policy = data?.message;

  console.log("1", useGetPrivacyPolicyQuery());

  const html = React.useMemo(() => {
    if (!policy) return "";

    return generateHTML(JSON.parse(policy), [StarterKit, Underline]);
  }, [policy]);

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
