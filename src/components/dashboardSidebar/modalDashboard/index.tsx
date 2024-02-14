"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectDasboardMenuBtn } from "../../../redux/dashboardMenuBtnSlice/selectors";
import { closeMenu, toggleMenu } from "../../../redux/dashboardMenuBtnSlice/slice";

import { useMediaQuery } from "../../../utils/customHooks";
import { setOverflowHidden } from "../../../utils/customFunctions";

import s from "./modalDashboard.module.scss";

type ModalMenuProps = {
  children: any;
};

export const ModalDashboard: React.FC<ModalMenuProps> = ({ children }) => {
  const { isMQ1024 } = useMediaQuery();

  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectDasboardMenuBtn);

  React.useEffect(() => {
    const cancelModal = () => {
      if (isModalOpen) {
        setOverflowHidden(false);
        dispatch(closeMenu());
      }
    };

    if (isMQ1024) {
      cancelModal();
    }

    return () => {
      cancelModal();
    };
  }, [isMQ1024]);

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
