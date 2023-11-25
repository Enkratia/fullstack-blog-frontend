import React from "react";
import Link from "next/link";

import cs from "../../scss/helpers.module.scss";
import s from "./UsMission.module.scss";

const data: UsMissionType = {
  about: {
    title: "We are a community of content writers who share their learnings",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  mission: {
    title: "Creating valuable content for creatives all around the world",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};

export const UsMission: React.FC = () => {
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

            <Link href="" className={s.btn}>{`Read More >`}</Link>
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
