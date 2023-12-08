import React from "react";
import Image from "next/image";

import { fetchKnowMoreQuery } from "../../fetchApi/fetchApi";

import cs from "../../scss/helpers.module.scss";
import s from "./knowMore.module.scss";

// const data: KnowMoreType = {
//   title: "Our team of creatives",
//   subtitle:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
//   imageUrl: "http://localhost:3001/api/images/1701100182001-1852x1500.png",
// };

export const KnowMore: React.FC = async () => {
  const { data, isError } = await fetchKnowMoreQuery();

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
            <Image src={data.imageUrl} alt="Section's picture." fill className={s.image} />
          </div>
        </div>
      </div>
    </section>
  );
};
