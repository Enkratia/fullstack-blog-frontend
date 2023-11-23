import React from "react";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./KnowMore.module.scss";

const data: KnowMoreType = {
  title: "Our team of creatives",
  subtitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/f8e6/8a26/fd526073f07987675c551110d3deb730?Expires=1701648000&Signature=JIe5MnpndtjBX5vKv2~7VYC0YOTk7tmZ2rzazTgszEEWCqJR2ZUFYBJlXop5KJhXDQKFjFedbDxSq73fv0nj9eHLpYuS9mnEQfrIImUpdq76o4h0SFPacohTrzyOWjn~m4VnF3athpO2VFR4RSkALlA83a5OulhxG7jVHBiel0Ky4Xfnfvkc1nUjkVjDrv9mYc838yLGvJk-RT85q12gjGtu-bWSMTwFyMKfogLrxaZBb0Da2HSugIAxKQwM4M2UGdfvaa5vBUfvg3hDLesCMw97gUh~p7XRXPRU8XaBJV5ko5cVWb1lFgsZNtCxAn-WQjp2HT3Z6CZ6cFeZFYTY7Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
};

export const KnowMore: React.FC = () => {
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
