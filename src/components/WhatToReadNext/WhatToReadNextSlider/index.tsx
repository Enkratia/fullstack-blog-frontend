"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./WhatToReadNextSlider.module.scss";

type WhatToReadNextSliderProps = {
  nextPosts: PostType[];
};

export const WhatToReadNextSlider: React.FC<WhatToReadNextSliderProps> = ({ nextPosts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider}>
        {nextPosts.map((obj) => (
          <div key={obj.id} className={s.slide}>
            <div className={s.imageWrapper}>
              <Image src={obj.imageUrl} alt={obj.title} className={s.image} fill />
            </div>

            <div className={cs.metadata}>
            <span className={cs.metadataItem}>
              By
              <Link
                href={`/users/${obj.user.id}`}
                className={cs.metadataName}>{` ${obj.user.firstName} ${obj.user.lastName}`}</Link>
            </span>

            <span className={cs.metadataItem}>{formatDate(obj.createdAt)}</span>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
