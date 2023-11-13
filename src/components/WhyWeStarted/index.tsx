import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./WhyWeStarted.module.scss";
import WhyWeStartedImage from "../../../public/img/why-we-started.png";

export const WhyWeStarted: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>The reason for starting this project.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.imageWrapper}>
          <Image src={WhyWeStartedImage} alt="Background image." aria-hidden="true" fill />
        </div>

        <div className={s.content}>
          <span className={s.subtitle}>Why we started</span>
          <p className={s.title}>It started out as a simple idea and evolved into our passion</p>
          <p className={s.descr}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip.
          </p>

          <Link href="" className={`${s.btn} ${cs.btn}`}>{`Discover our story >`}</Link>
        </div>
      </div>
    </section>
  );
};
