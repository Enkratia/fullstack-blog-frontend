"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectMenuBtn } from "@/redux/menuBtnSlice/selectors";
import { closeMenu, toggleMenu } from "@/redux/menuBtnSlice/slice";

import { setOverflowHidden } from "../../utils/customFunctions";

import s from "./modalR.module.scss";

type ModalRProps = {
  children: any;
};

export const ModalR: React.FC<ModalRProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectMenuBtn);

  React.useEffect(() => {
    return () => {
      setOverflowHidden(false);
      dispatch(closeMenu());
    };
  }, []);

  const onModalCloseClick = () => {
    setOverflowHidden(isModalOpen);
    dispatch(toggleMenu());
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
    onModalOutsideClick,
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
