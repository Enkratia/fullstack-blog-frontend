import React, { Suspense } from "react";
import Link from "next/link";

import { fetchUsMissionQuery } from "../../fetchApi/fetchApi";

import { SkeletonUsMission, ToastComponent } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./usMission.module.scss";

const UsMissionSuspense: React.FC = async () => {
  let { data } = await fetchUsMissionQuery();

  if (!data) {
    return (
      <>
        <SkeletonUsMission />
        <ToastComponent type="warning" requestId="server" text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Our mission and information about us.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={cs.decoration}>
          <span className={cs.decorationItem}></span>
          <span className={cs.decorationItem}></span>
          <span className={cs.decorationItem}></span>
        </div>

        <div className={s.content}>
          <div className={s.us}>
            <span className={s.subtitle}>About us</span>
            <p className={`${s.title} ${cs.title}`}>{data.about.title}</p>

            <p className={`${s.descr} ${s.descrMargin}`}>{data.about.description}</p>

            <Link href="/about-us" className={s.btn}>{`Read More >`}</Link>
          </div>

          <div className={s.mission}>
            <span className={s.subtitle}>Our mission</span>
            <p className={s.missionTitle}>{data.mission.title}</p>

            <p className={s.descr}>{data.mission.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// **
export const UsMission: React.FC = async () => (
  <Suspense fallback={<SkeletonUsMission />}>
    <UsMissionSuspense />
  </Suspense>
);
