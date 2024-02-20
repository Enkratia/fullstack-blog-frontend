import React, { Suspense } from "react";
import Image from "next/image";

import { fetchKnowMoreQuery } from "../../fetchApi/fetchApi";

import { SkeletonKnowMore, ToastComponent } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./knowMore.module.scss";

const KnowMoreSuspense: React.FC = async () => {
  const { data } = await fetchKnowMoreQuery();

  if (!data) {
    return (
      <>
        <SkeletonKnowMore />
        <ToastComponent type="warning" requestId="server" text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Creativity of our team.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.text}>
          <p className={`${s.title} ${cs.title}`}>{data.title}</p>
          <span className={s.subtitle}>{data.subtitle}</span>
          <p className={s.description}>{data.description}</p>
        </div>

        <div className={s.imageWrapper}>
          <div className={s.imageWrapperInner}>
            <Image
              src={data.imageUrl}
              alt="Section's picture."
              fill
              sizes="(max-width: 678px) 100vw, 50vw"
              className={s.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// **
export const KnowMore: React.FC = async () => (
  <Suspense fallback={<SkeletonKnowMore />}>
    <KnowMoreSuspense />
  </Suspense>
);
