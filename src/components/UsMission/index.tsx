import React from "react";
import Link from "next/link";

import cs from "../../scss/helpers.module.scss";
import s from "./UsMission.module.scss";

export const UsMission: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Our mission and information about us.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.decoration}>
          <span className={s.decorationItem}></span>
          <span className={s.decorationItem}></span>
          <span className={s.decorationItem}></span>
        </div>

        <div className={s.content}>
          <div className={s.us}>
            <span className={s.subtitle}>About us</span>
            <p className={`${s.title} ${cs.title}`}>
              We&nbsp;are a&nbsp;community of content&nbsp;writers who share their learnings
            </p>

            <p className={`${s.descr} ${s.descrMargin}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <Link href="" className={s.btn}>{`Read More >`}</Link>
          </div>

          <div className={s.mission}>
            <span className={s.subtitle}>Our mission</span>
            <p className={s.missionTitle}>
              Creating valuable content for creatives all around the world
            </p>

            <p className={s.descr}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
