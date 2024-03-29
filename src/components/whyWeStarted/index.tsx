import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchWhyWeStartedQuery } from "../../fetchApi/fetchApi";

import { SkeletonWhyWeStarted, ToastComponent } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./whyWeStarted.module.scss";

const WhyWeStartedSuspense: React.FC = async () => {
  const { data, args } = await fetchWhyWeStartedQuery();

  if (!data) {
    return (
      <>
        <SkeletonWhyWeStarted />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>The reason for starting this project.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.coincidenceBlock1} aria-hidden="true"></div>
        <div className={s.coincidenceBlock2} aria-hidden="true"></div>
        <div className={s.coincidenceBlock3} aria-hidden="true"></div>

        <div className={s.imageWrapper} aria-hidden="true">
          <Image
            src={data.imageUrl}
            alt="Background image."
            className={s.image}
            aria-hidden="true"
            sizes="(max-width: 700px) 0vw, 75vw"
            fill
          />
        </div>

        <div className={s.content}>
          <span className={s.subtitle}>{data.subtitle}</span>
          <p className={s.title}>{data.title}</p>
          <p className={s.descr}>{data.description}</p>

          <Link
            href="/about-us#why-this-blog"
            className={`${s.btn} ${cs.btn}`}>{`Discover our story >`}</Link>
        </div>
      </div>
    </section>
  );
};

// **
export const WhyWeStarted: React.FC = async () => (
  <Suspense fallback={<SkeletonWhyWeStarted />}>
    <WhyWeStartedSuspense />
  </Suspense>
);
