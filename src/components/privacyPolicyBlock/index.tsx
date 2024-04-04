"use client";

import React from "react";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { SkeletonPrivacyPolicy } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyBlock.module.scss";

type PrivacyPolicyBlockProps = {
  data: PrivacyPolicyType;
};

export const PrivacyPolicyBlock: React.FC<PrivacyPolicyBlockProps> = ({ data }) => {
  const policy = data.message;

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
        spellCheck={false}
        className={`${cs.article} ${cs.container} ${cs.container768}`}
        dangerouslySetInnerHTML={{ __html: html }}></article>
    </section>
  );
};
