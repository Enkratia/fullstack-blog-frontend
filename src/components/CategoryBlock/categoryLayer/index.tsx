"use client";

import React from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { CategoryCategories, CategoryPosts, CategoryTags } from "../../../components";

import { useMediaQuery } from "../../../utils/customHooks";
import { setOverflowHidden } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryLayer.module.scss";
import Close from "../../../../public/img/close.svg";

export const CategoryLayer: React.FC = () => {
  const { isMQ1024 } = useMediaQuery();
  const [isVisible, setIsVisible] = React.useState(false);

  // **
  const onSidebarClick = () => {
    setIsVisible((b) => !b);
    setOverflowHidden(!isVisible);
  };

  // **
  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMQ1024) return;

    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");
    onSidebarClick();
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMQ1024) return;

    if (e.target === e.currentTarget) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  // **
  const scrollbarOptions = {
    scrollbars: {
      theme: s.osThemeSidebar,
    },
  };

  return (
    <div className={`${s.container} ${cs.container}`}>
      <CategoryPosts />

      <div
        onClick={onModalOutsideClick}
        onPointerDown={onModalPointerDown}
        className={`${s.sidebarWrapper} ${isVisible ? s.sidebarWrapperActive : ""}`}>
        <div className={s.sidebarWrapperInner}>
          <div className={s.sidebarHead}>
            <p className={`${s.sidebarTitle} ${cs.title}`}>Blog Sidebar</p>

            <button
              onClick={onSidebarClick}
              className={s.sidebarClose}
              aria-label="Close the modal window.">
              <Close aria-hidden="true" />
            </button>
          </div>

          <OverlayScrollbarsComponent
            element="aside"
            options={scrollbarOptions}
            defer
            className={s.sidebar}>
            <CategoryCategories />
            <CategoryTags />
          </OverlayScrollbarsComponent>
        </div>
      </div>

      <div className={s.showWrapper}>
        <button onClick={onSidebarClick} className={`${s.show} ${cs.btn}`}>
          Blog Sidebar
        </button>
      </div>
    </div>
  );
};
