"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleMenu } from "@/redux/menuBtnSlice/slice";

import { setOverflowHidden } from "@/utils/customFunctions";

import s from "./openMenuBtn.module.scss";
import { selectMenuBtn } from "@/redux/menuBtnSlice/selectors";

export const OpenMenuBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectMenuBtn);

  const onBtnClick = () => {
    setOverflowHidden(!isModalOpen);
    dispatch(toggleMenu());
  };

  return (
    <div className={s.root}>
      <button
        onClick={onBtnClick}
        className={`${s.btn} ${isModalOpen ? s.btnShow : ""}`}
        aria-label="Open menu."
        aria-pressed={isModalOpen ? "true" : "false"}>
        <span className={s.line} aria-hidden="true"></span>
        <span className={s.line} aria-hidden="true"></span>
        <span className={s.line} aria-hidden="true"></span>
      </button>
    </div>
  );
};
