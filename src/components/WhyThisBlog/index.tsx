import React from "react";
import Image from "next/image";

import { fetchWhyThisBlogQuery } from "../../fetchApi/fetchApi";

import cs from "../../scss/helpers.module.scss";
import s from "./whyThisBlog.module.scss";

export const WhyThisBlog: React.FC = async () => {
  const { data, isError } = await fetchWhyThisBlogQuery();

  if (!data) {
    return;
  }

  return (
    <section className={s.root} id="why-this-blog">
      <h2 className={cs.srOnly}>Creativity of our team.</h2>

      <div className={`${s.container} ${cs.container}`}>
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

        <div className={s.text}>
          <p className={`${s.title} ${cs.title}`}>{data.title}</p>
          <span className={s.subtitle}>{data.subtitle}</span>
          <p className={s.description}>{data.description}</p>
        </div>
      </div>
    </section>
  );
};
