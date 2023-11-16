"use client";

import React from "react";
import Image from "next/image";

import Slider from "react-slick";

import s from "./TestimonialsSlider.module.scss";
import Arrow from "../../../../public/img/arrow.svg";

const testimonials = [
  {
    id: 0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporliqua eius tempor dipiscing elit.",
    imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    fullName: "Jonathan Vallem",
    address: "New york, USA",
  },
  {
    id: 2,
    text: "Lorem ipsum t dolore magna aliqua dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ed  sed do eiusmod tempor incididunt, t dolore magna aliqua dolor sit.",
    imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    fullName: "Winston Leski",
    address: "New york, USA",
  },
  {
    id: 3,
    text: "Lorem adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aliquid beatae aperiam, sed ullam odio incidunt suscipit quidem quam error in. Beatae rerum quae modi ullam, ipsam commodi doloremque veniam excepturi est. Consequuntur quibusdam ratione numquam fugiat id molestias. Doloremque debitis eius, ullam voluptatum sapiente soluta suscipit excepturi inventore explicabo laudantium nulla quibusdam architecto ipsa impedit rerum laboriosam dolorem in eveniet nobis magni sequi eligendi amet voluptatem? Ullam minus nostrum id in culpa tempora sapiente ipsa rem eveniet. Odio, dolorum minima quisquam quos accusantium vitae fuga incidunt aut illo suscipit nemo molestiae dolore ab porro, asperiores impedit deleniti eveniet ea!",
    imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    fullName: "William Bradly",
    address: "New york, USA",
  },
];

const defaultHeight = 128;

const TextButton: React.FC = () => {
  const [isActive, setIsActive] = React.useState(false);

  const onTextBtnClick = () => {
    setIsActive((b) => !b);
  };

  return (
    <button
      onClick={onTextBtnClick}
      className={s.textBtn}
      data-text-btn-active={isActive ? true : false}
      aria-label={`Show / hide entire message.`}
      aria-pressed={isActive ? true : false}></button>
  );
};

export const TestimonialsSlider: React.FC = () => {
  const clickableRef = React.useRef(true);
  const sliderRef = React.useRef<Slider>(null);
  const sliderWrapperRef = React.useRef<HTMLDivElement>(null);

  const [slide, setSlide] = React.useState(0);
  const slidesTotal = testimonials.length;

  React.useEffect(() => {
    console.log(sliderWrapperRef.current.querySelector(".slick-current"));
  });

  // **
  const onNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const onPrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const onAfterChange = (idx: number) => {
    setSlide(idx);

    if (!sliderWrapperRef.current) return;

    const prevOverflowSlide = sliderWrapperRef.current.querySelector(`[data-text-btn-visible]`);
    if (prevOverflowSlide) {
      prevOverflowSlide.removeAttribute("data-text-btn-visible");
    }

    const currentSlide = sliderWrapperRef.current.querySelector(`[data-index="${idx}"]`);
    if (!currentSlide) return;

    const textBtn = currentSlide.querySelector("button");
    if (!textBtn) return;

    const text = textBtn.nextElementSibling;
    if (!text) return;

    const textSH = text?.scrollHeight;
    if (textSH > defaultHeight) {
      textBtn.setAttribute("data-text-btn-visible", "");
    }
  };

  // **
  const createSliderExit = (e: React.FocusEvent) => {
    const list = e.currentTarget.querySelector(".slick-list");
    const slickExit = document.createElement("span");
    slickExit.className = "slick-exit";
    slickExit.setAttribute("tabindex", "0");
    list?.appendChild(slickExit);
  };

  const startSliderKeyMode = (e: React.FocusEvent | React.KeyboardEvent) => {
    const firstSlide = e.currentTarget.querySelectorAll(".slick-slide:not(.slick-cloned)")[0];
    sliderRef.current?.slickGoTo(0);
    (firstSlide as HTMLElement)?.focus();
  };

  const getSliderInfo = (e: React.FocusEvent | React.KeyboardEvent) => {
    const slide = (e.target as HTMLElement)?.closest(".slick-slide");

    const nextSlide = slide?.nextElementSibling;
    const prevSlide = slide?.previousElementSibling;

    const isNextSlideClone = nextSlide?.classList.contains("slick-cloned");
    const isNextSlideActive = nextSlide?.classList.contains("slick-active");

    const isPrevSlideClone = prevSlide?.classList.contains("slick-cloned");
    const isPrevSlideActive = prevSlide?.classList.contains("slick-active");

    const interactive = slide?.querySelectorAll("a, button, [tabindex='0']") || [];
    const realInteractive = Array.from(interactive).filter(
      (elem) => window.getComputedStyle(elem).visibility !== "hidden",
    );

    const firstInteractive = realInteractive[0];
    const lastInteractive = realInteractive[realInteractive.length - 1];

    return {
      nextSlide,
      isNextSlideClone,
      isNextSlideActive,
      isPrevSlideClone,
      isPrevSlideActive,
      firstInteractive,
      lastInteractive,
    };
  };

  const onSliderBlur = (e: React.FocusEvent) => {
    if (e.target.hasAttribute("data-key-next")) {
      e.target.removeAttribute("data-key-next");
      return;
    }

    if (e.target.hasAttribute("data-key-prev")) {
      e.target.removeAttribute("data-key-prev");
    }
  };

  const onSliderPointerDown = (e: React.MouseEvent) => {
    e.currentTarget.removeAttribute("data-key-mode");
  };

  const onSliderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    e.currentTarget.setAttribute("data-key-mode", "");

    const {
      isNextSlideClone,
      isNextSlideActive,
      isPrevSlideClone,
      isPrevSlideActive,
      firstInteractive,
      lastInteractive,
    } = getSliderInfo(e);
    const slickExit = e.currentTarget.querySelector(".slick-exit") as HTMLElement;

    if ((e.target as HTMLElement).hasAttribute("data-key-next") && e.shiftKey) {
      e.preventDefault();
      (e.target as HTMLElement).removeAttribute("data-key-next");
      sliderRef.current?.slickPrev();
      return;
    }

    if ((e.target as HTMLElement).hasAttribute("data-key-prev") && !e.shiftKey) {
      e.preventDefault();
      (e.target as HTMLElement).removeAttribute("data-key-prev");
      sliderRef.current?.slickNext();
      return;
    }

    if (e.target === e.currentTarget && !e.shiftKey) {
      startSliderKeyMode(e);
      return;
    }

    if (slickExit && e.target === slickExit && e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).focus();
      return;
    }

    if (isNextSlideClone && e.target === lastInteractive && !e.shiftKey) {
      e.preventDefault();
      slickExit?.focus();
      return;
    }

    if (isPrevSlideClone && e.target === firstInteractive && e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement)?.focus();
      return;
    }

    const islastInteractiveElement = e.target === lastInteractive;
    if (!isNextSlideActive && !isNextSlideClone && islastInteractiveElement && !e.shiftKey) {
      e.preventDefault();

      if (isNextSlideActive === undefined && isNextSlideClone === undefined) {
        slickExit?.focus();
        return;
      }

      (e.target as HTMLElement).setAttribute("data-key-next", "");
      sliderRef.current?.slickNext();
      return;
    }

    const isfirstInteractiveElement = e.target === firstInteractive;
    if (!isPrevSlideActive && !isPrevSlideClone && isfirstInteractiveElement && e.shiftKey) {
      e.preventDefault();

      if (isPrevSlideActive === undefined && isPrevSlideClone === undefined) {
        (e.currentTarget as HTMLElement)?.focus();
        return;
      }

      (e.target as HTMLElement).setAttribute("data-key-prev", "");
      sliderRef.current?.slickPrev();
      return;
    }
  };

  const onSliderFocus = (e: React.FocusEvent) => {
    let slickExit = e.currentTarget.querySelector(".slick-exit");

    if (!slickExit) {
      createSliderExit(e);
    }
  };

  // **
  const handleClick = (event: MouseEvent) => {
    // Для swipeEvent
    if (!clickableRef.current) {
      event.stopPropagation();
      event.preventDefault();
    }
    clickableRef.current = true;
  };

  const swipeEvent = () => {
    // Фикс (слайдер воспринимает свайп, как клик)
    if (sliderRef?.current?.innerSlider?.list) {
      sliderRef.current.innerSlider.list.onclick = handleClick;
      clickableRef.current = false;
    }
  };

  let settings = {
    arrows: false,
    dots: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: false,
    afterChange: onAfterChange,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //   },
      // },
    ],
  };

  return (
    <div
      className={s.root}
      tabIndex={0}
      ref={sliderWrapperRef}
      onFocus={onSliderFocus}
      onKeyDown={onSliderKeyDown}
      onBlur={onSliderBlur}
      onPointerDown={onSliderPointerDown}>
      <Slider ref={sliderRef} swipeEvent={swipeEvent} {...settings} className={s.slider}>
        {testimonials.map((obj) => (
          <div key={obj.id} className={s.item}>
            <div className={s.textWrapper}>
              <TextButton />
              <p className={s.text}>{obj.text}</p>
            </div>

            <div className={s.info}>
              <div className={s.imageWrapper}>
                <Image src={obj.imageUrl} alt="Avatar of the author." className={s.image} fill />
              </div>

              <div className={s.bottom}>
                <div className={s.metadata}>
                  <span className={s.fullname}>{obj.fullName}</span>
                  <span className={s.address}>{obj.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

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
