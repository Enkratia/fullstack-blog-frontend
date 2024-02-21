import React, { Suspense } from "react";

import { fetchJoinQuery } from "../../fetchApi/fetchApi";

import { JoinBtn, SkeletonJoin, ToastComponent } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./join.module.scss";

const JoinSuspense: React.FC = async () => {
  const { data, args } = await fetchJoinQuery();

  if (!data) {
    return (
      <>
        <SkeletonJoin />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.content}>
          <h2 className={cs.srOnly}>Inviting to join our team.</h2>

          <p className={`${s.title} ${cs.title}`}>{data.title}</p>
          <p className={s.descr}>{data.description}</p>

          <JoinBtn />
        </div>
      </div>
    </section>
  );
};

// **
export const Join: React.FC = async () => (
  <Suspense fallback={<SkeletonJoin />}>
    <JoinSuspense />
  </Suspense>
);
