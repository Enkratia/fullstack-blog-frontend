"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleMenu } from "../../redux/dashboardMenuBtnSlice/slice";
import { selectDasboardMenuBtn } from "../../redux/dashboardMenuBtnSlice/selectors";

import { DashboardNav, ModalDashboard } from "../../components";
import { setOverflowHidden } from "../../utils/customFunctions";

import s from "./dashboardSidebar.module.scss";
import Chevron from "../../../public/img/default/chevron.svg";

export const DashboardSidebar: React.FC = () => {
  const { isModalOpen } = useAppSelector(selectDasboardMenuBtn);
  const dispatch = useAppDispatch();

  // **
  const onMenuBtnClick = () => {
    dispatch(toggleMenu());
    setOverflowHidden(!isModalOpen);
  };

  return (
    <div className={s.root}>
      <div className={s.menuBtnWrapper}>
        <button
          onClick={onMenuBtnClick}
          className={`${s.menuBtn} ${isModalOpen ? s.menuBtnActive : ""}`}>
          <Chevron /> Menu
        </button>
      </div>

      <ModalDashboard>
        <DashboardNav />
      </ModalDashboard>
    </div>
  );
};
