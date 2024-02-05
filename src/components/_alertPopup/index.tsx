import React from "react";

import { setOverflowHidden } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./_alertPopup.module.scss";

import Exclamation from "../../../public/img/default/exclamation-circle.svg";

type AlertPopupProps = {
  onAlertClick: (value: boolean) => void;
};

export const AlertPopup: React.FC<AlertPopupProps> = ({ onAlertClick }) => {
  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");

    onAlertClick(false);
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const child = e.currentTarget.firstElementChild as HTMLDivElement;

    if (e.target === e.currentTarget || e.target === child) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  // **
  React.useEffect(() => {
    setOverflowHidden(true);
    return () => setOverflowHidden(false);
  }, []);

  return (
    <div onClick={onModalOutsideClick} onPointerDown={onModalPointerDown} className={s.root}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <Exclamation aria-hidden="true" />

          <h1 className={`${s.title} ${cs.title}`}>Your post will be deleted Permanently!</h1>

          <p className={s.descr}>Are you sure to proceed?</p>

          <div className={s.btns}>
            <button className={`${s.btn} ${cs.btn}`} onClick={() => onAlertClick(false)}>
              No
            </button>

            <button className={`${s.btn} ${cs.btn}`} onClick={() => onAlertClick(true)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
