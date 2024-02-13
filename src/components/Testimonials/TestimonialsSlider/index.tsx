"use client";

import React from "react";
import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";

import { useGetTestimonialQuery } from "../../../redux/backendApi";

import { Testimonial } from "../../../components";

import s from "./TestimonialsSlider.module.scss";
import Arrow from "../../../../public/img/arrow.svg";
import Deafult from "../../../../public/img/default/user.png";

// const testimonials: TestimonialType[] = [
//   {
//     id: 0,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporliqua eius tempor dipiscing elit.",
//     imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
//     fullname: "Jonathan Vallem",
//     address: "New york, USA",
//   },
//   {
//     id: 2,
//     text: "Lorem ipsum t dolore magna aliqua dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ed  sed do eiusmod tempor incididunt, t dolore magna aliqua dolor sit.",
//     imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
//     fullname: "Winston Leski",
//     address: "New york, USA",
//   },
//   {
//     id: 3,
//     text: "Lorem adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aliquid beatae aperiam, sed ullam odio incidunt suscipit quidem quam error in. Beatae rerum quae modi ullam, ipsam commodi doloremque veniam excepturi est. Consequuntur quibusdam ratione numquam fugiat id molestias. Doloremque debitis eius, ullam voluptatum sapiente soluta suscipit excepturi inventore explicabo laudantium nulla quibusdam architecto ipsa impedit rerum laboriosam dolorem in eveniet nobis magni sequi eligendi amet voluptatem? Ullam minus nostrum id in culpa tempora sapiente ipsa rem eveniet. Odio, dolorum minima quisquam quos accusantium vitae fuga incidunt aut illo suscipit nemo molestiae dolore ab porro, asperiores impedit deleniti eveniet ea!",
//     imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
//     fullname: "William Bradly",
//     address: "New york, USA",
//   },
// ];

const defaultHeight = 160;
const limit = 3;
const page = 1;

export const TestimonialsSlider: React.FC = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const request = `?_page=${page}&_limit=${limit}`;
  const { data, isError } = useGetTestimonialQuery(request);
  const testimonials = data?.data;

  const [slide, setSlide] = React.useState(0);

  React.useEffect(() => {
    if (!sliderRef.current) return;

    const prevVisibleTextBtn = sliderRef.current.querySelector(`[data-text-btn-visible]`);
    if (prevVisibleTextBtn) {
      prevVisibleTextBtn.removeAttribute("data-text-btn-visible");
    }

    const currentSlide = sliderRef.current.children[slide];
    if (!currentSlide) return;

    const textBtn = currentSlide.querySelector("button");
    if (!textBtn) return;

    const text = textBtn.nextElementSibling;
    if (!text) return;

    const textSH = text.scrollHeight;
    if (textSH > defaultHeight) {
      textBtn.setAttribute("data-text-btn-visible", "");
    }
  });

  const onPrevClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();

    const currentSlideIdx = emblaApi?.selectedScrollSnap();
    if (currentSlideIdx === undefined || typeof currentSlideIdx !== "number") return;

    setSlide(currentSlideIdx);
  }, [emblaApi]);

  const onNextClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();

    const currentSlideIdx = emblaApi?.selectedScrollSnap();
    if (currentSlideIdx === undefined || typeof currentSlideIdx !== "number") return;

    setSlide(currentSlideIdx);
  }, [emblaApi]);

  if (!testimonials) {
    return;
  }

  const slidesTotal = testimonials.length;

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider} ref={sliderRef}>
        {testimonials.map((obj, i) => (
          <Testimonial key={i} obj={obj} index={i} currentSlide={slide} />
        ))}
      </div>

      <div className={s.navigation}>
        <button
          onClick={onPrevClick}
          className={`${s.btn} ${slide === 0 ? s.btnInactive : ""}`}
          aria-label="Go to the previous slide.">
          <Arrow aria-hidden="true" />
        </button>
        <button
          onClick={onNextClick}
          className={`${s.btn} ${slide === slidesTotal - 1 ? s.btnInactive : ""}`}
          aria-label="Go to the next slide.">
          <Arrow aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
