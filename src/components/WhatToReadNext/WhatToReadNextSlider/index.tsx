"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";

import { formatDate3 } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./whatToReadNextSlider.module.scss";

type WhatToReadNextSliderProps = {
  nextPosts: PostType[];
};

export const WhatToReadNextSlider: React.FC<WhatToReadNextSliderProps> = ({ nextPosts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider}>
        {nextPosts.map((obj, i) => (
          <div key={obj.id} className={s.slide}>
            <Link href="" className={s.imageWrapper}>
              <Image src={obj.imageUrl} alt={obj.title} className={s.image} fill />
            </Link>

            <div className={`${s.metadata} ${cs.metadata}`}>
              <span className={cs.metadataItem}>
                By
                <Link
                  href={`/users/${obj.user.id}`}
                  className={cs.metadataName}>{` ${obj.user.fullname}`}</Link>
              </span>

              <span className={cs.metadataItem}>{formatDate3(obj.createdAt)}</span>
            </div>

            <h3 className={s.title}>
              <Link href="">{obj.title}</Link>
            </h3>

            <p className={s.descr}>{obj.contentText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
