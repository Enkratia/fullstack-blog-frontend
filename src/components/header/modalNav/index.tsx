"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectMenuBtn } from "../../../redux/menuBtnSlice/selectors";
import { closeMenu, toggleMenu } from "../../../redux/menuBtnSlice/slice";

import { useMediaQuery } from "../../../utils/customHooks";
import { setOverflowHidden } from "../../../utils/customFunctions";

import s from "./modalNav.module.scss";

type ModalNavProps = {
  children: any;
};

export const ModalNav: React.FC<ModalNavProps> = ({ children }) => {
  const { isMQ896 } = useMediaQuery();

  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectMenuBtn);

  React.useEffect(() => {
    const cancelModal = () => {
      if (isModalOpen) {
        setOverflowHidden(false);
        dispatch(closeMenu());
      }
    };

    if (isMQ896) {
      cancelModal();
    }

    return () => {
      cancelModal();
    };
  }, [isMQ896]);

  // **
  const onModalCloseClick = () => {
    dispatch(toggleMenu());
    setOverflowHidden(!isModalOpen);
  };

  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");

    onModalCloseClick();
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  const newChildren = React.cloneElement(children, {
    onModalCloseClick,
    isModalOpen,
  });

  return (
    <div
      onPointerDown={onModalPointerDown}
      onClick={onModalOutsideClick}
      className={`${s.root} ${isModalOpen ? s.rootActive : ""}`}>
      {newChildren}
    </div>
  );
};
