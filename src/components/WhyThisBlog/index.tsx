import React from "react";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./WhyThisBlog.module.scss";

const data: WhyThisBlogType = {
  title: "Why we started this Blog",
  subtitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/0bea/29f8/b102cf84acef9a9da0fb129e98c1d7b5?Expires=1701648000&Signature=ht4MQ-HOzBk~vtT0LVps~SM4lwIvime~O1ombc5waXIKPAGWFplza7gwdNsya-oRmGYl6n5jmDSupp4C~TWQeCqQNyN19ePXwJEGmRz0U~kz6jOgDfRnE6dfbfHLTecwN0EkYN5qOBAM47PoHfW1X-npCIlJ0i9ndaEtT0iCFcAsYrScJThBEO05Ios9lVO0~8GcCAYJQY6tij7uI7U~nLQrL1rr90dUQxjjWLsvovCxJKbn9af6ra9c5X8884tip68US~FcNYsrXBLgq1JaP3-~iEQhI7IjMqjPwe9j2RsKHERTQE091czh8JZ0S2eKCK1hYpIRitkd5QSlW2maRg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
};

export const WhyThisBlog: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Creativity of our team.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.imageWrapper}>
          <div className={s.imageWrapperInner}>
            <Image src={data.imageUrl} alt="Section's picture." fill className={s.image} />
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
