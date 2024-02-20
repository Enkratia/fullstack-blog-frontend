"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useGetTestimonialQuery } from "../../../redux/backendApi";

import { SkeletonTestimonial, Testimonial } from "../../../components";

import s from "./TestimonialsSlider.module.scss";
import Arrow from "../../../../public/img/arrow.svg";

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

  // **
  const slidesTotal = testimonials?.length;

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider} ref={sliderRef}>
        {!slidesTotal ? (
          <SkeletonTestimonial />
        ) : (
          testimonials.map((obj, i) => (
            <Testimonial key={i} obj={obj} index={i} currentSlide={slide} />
          ))
        )}
      </div>

      {!!slidesTotal && (
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
      )}
    </div>
  );
};
