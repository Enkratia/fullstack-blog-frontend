import React from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchWhyWeStartedQuery } from "../../fetchApi/fetchApi";

import cs from "../../scss/helpers.module.scss";
import s from "./whyWeStarted.module.scss";

// const data: WhyWeStartedType = {
//   imageUrl: "http://localhost:3001/api/images/1701100182000-1789x1006.png",
//   subtitle: "Why we started",
//   title: "It started out as a simple idea and evolved into our passion",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
// };

export const WhyWeStarted: React.FC = async () => {
  const { isError, data } = await fetchWhyWeStartedQuery();

  if (!data) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>The reason for starting this project.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.coincidenceBlock1} aria-hidden="true"></div>
        <div className={s.coincidenceBlock2} aria-hidden="true"></div>
        <div className={s.coincidenceBlock3} aria-hidden="true"></div>

        <div className={s.imageWrapper} aria-hidden="true">
          <Image
            src={data.imageUrl}
            alt="Background image."
            className={s.image}
            aria-hidden="true"
            fill
          />
        </div>

        <div className={s.content}>
          <span className={s.subtitle}>{data.subtitle}</span>
          <p className={s.title}>{data.title}</p>
          <p className={s.descr}>{data.description}</p>

          <Link href="" className={`${s.btn} ${cs.btn}`}>{`Discover our story >`}</Link>
        </div>
      </div>
    </section>
  );
};

// export const WhyWeStarted: React.FC = () => {
//   return (
//     <section className={s.root}>
//       <h2 className={cs.srOnly}>The reason for starting this project.</h2>

//       <div className={`${s.container} ${cs.container}`}>
//         <div className={s.coincidenceBlock1} aria-hidden="true"></div>
//         <div className={s.coincidenceBlock2} aria-hidden="true"></div>
//         <div className={s.coincidenceBlock3} aria-hidden="true"></div>

//         <div className={s.imageWrapper} aria-hidden="true"></div>

//         <div className={s.content}>
//           <span className={s.subtitle}>{data.subtitle}</span>
//           <p className={s.title}>{data.title}</p>
//           <p className={s.descr}>{data.description}</p>

//           <Link href="" className={`${s.btn} ${cs.btn}`}>{`Discover our story >`}</Link>
//         </div>
//       </div>
//     </section>
//   );
// };
