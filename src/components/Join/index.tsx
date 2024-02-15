import React from "react";

import { fetchJoinQuery } from "../../fetchApi/fetchApi";

import { JoinBtn } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./join.module.scss";

export const Join: React.FC = async () => {
  const { isError, data } = await fetchJoinQuery();

  if (!data) {
    return;
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
