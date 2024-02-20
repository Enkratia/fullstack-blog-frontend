"use client";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectMenuBtn } from "../../../redux/menuBtnSlice/selectors";
import { toggleMenu } from "../../../redux/menuBtnSlice/slice";

import { setOverflowHidden } from "../../../utils/customFunctions";

import s from "./openMenuBtn.module.scss";

export const OpenMenuBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectMenuBtn);

  const onBtnClick = () => {
    setOverflowHidden(!isModalOpen);
    dispatch(toggleMenu());
  };

  return (
    <button
      onClick={onBtnClick}
      className={`${s.root} ${isModalOpen ? s.rootShow : ""}`}
      aria-label="Open menu."
      aria-pressed={isModalOpen ? "true" : "false"}>
      <span className={s.line} aria-hidden="true"></span>
      <span className={s.line} aria-hidden="true"></span>
      <span className={s.line} aria-hidden="true"></span>
    </button>
  );
};
