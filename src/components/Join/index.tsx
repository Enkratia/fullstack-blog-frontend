import React from "react";
import Link from "next/link";

import cs from "../../scss/helpers.module.scss";
import s from "./Join.module.scss";

export const Join: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={cs.srOnly}>Inviting to join our team.</h2>
        <p className={`${s.title} ${cs.title}`}>Join our team to be a part of our story</p>
        <p className={s.descr}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        <Link href="" className={`${s.btn} ${cs.btn}`}>
          Join Now
        </Link>
      </div>
    </section>
  );
};
