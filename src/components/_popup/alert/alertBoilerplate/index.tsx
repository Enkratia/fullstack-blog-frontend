import React from "react";

import { setOverflowHidden } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./alertBoilerplate.module.scss";

type AlertPopupProps = {
  onAlertClick: () => void;
  title: string;
};

export const AlertBoilerplatePopup: React.FC<AlertPopupProps> = ({ onAlertClick, title }) => {
  React.useEffect(() => {
    setOverflowHidden(true);

    return () => setOverflowHidden(false);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.icon} aria-hidden="true"></div>

          <h1 className={`${s.title} ${cs.title}`}>{title}</h1>

          <button className={`${s.btn} ${cs.btn}`} onClick={onAlertClick}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};
