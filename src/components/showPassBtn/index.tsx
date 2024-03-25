import React from "react";

import s from "./showPassBtn.module.scss";
import Eye from "../../../public/img/eye.svg";
import EyeClosed from "../../../public/img/eye-closed.svg";

type ShowPassBtnProps = {
  isShowPass: boolean;
  setIsShowPass: () => void;
};

export const ShowPassBtn: React.FC<ShowPassBtnProps> = ({ isShowPass, setIsShowPass }) => {
  return (
    <button
      onClick={setIsShowPass}
      className={s.showPass}
      aria-label={`${isShowPass ? "Hide " : "Show"} password.`}
      type="button">
      {isShowPass ? <EyeClosed aria-hidden="true" /> : <Eye aria-hidden="true" />}
    </button>
  );
};

// *************************************************************
// const [isShowPass, setIsShowPass] = useImmer([false, false]);

// **
// <ShowPassBtn isShowPass={isShowPass[1]} setIsShowPass={() => onShowPassBtnClick(1)} />

// **
// const onShowPassBtnClick = (idx: number) => {
//   setIsShowPass((o) => {
//     o[idx] = !o[idx];
//     return o;
//   });
// };
