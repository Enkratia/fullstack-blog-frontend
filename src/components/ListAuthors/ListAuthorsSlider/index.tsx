"use client";

import React from "react";
import Slider from "react-slick";

import { AuthorCard } from "../../../components";

import s from "./ListAuthorsSlider.module.scss";

const authorsList: AuthorsListItemType[] = [
  {
    id: 1,
    imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
    firstName: "Floyd",
    lastName: "Miles",
    profession: "Content Writer",
    company: "Company",
    authorLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 2,
    imageUrl: "https://i.postimg.cc/c419Fqtq/94c1db47acb8141c7502d8724bd28fbd.png",
    firstName: "Dianne",
    lastName: "Russell",
    profession: "Content Writer",
    company: "Company",
    authorLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 3,
    imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
    firstName: "Jenny",
    lastName: "Wilson",
    profession: "Content Writer",
    company: "Company",
    authorLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 4,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    authorLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 5,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    authorLinks: [{ facebook: null }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
];

export const ListAuthorsSlider = () => {
  const clickableRef = React.useRef(true);
  const sliderRef = React.useRef<Slider>(null);

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
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className={s.root}
      tabIndex={0}
      onFocus={onSliderFocus}
      onKeyDown={onSliderKeyDown}
      onBlur={onSliderBlur}
      onPointerDown={onSliderPointerDown}>
      <Slider ref={sliderRef} swipeEvent={swipeEvent} {...settings} className={s.slider}>
        {authorsList.map((obj) => (
          <AuthorCard key={obj.id} author={obj} />
        ))}
      </Slider>
    </div>
  );
};
