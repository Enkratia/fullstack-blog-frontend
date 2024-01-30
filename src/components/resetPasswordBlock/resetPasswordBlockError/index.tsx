import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "../../signinBlock/signinBlock.module.scss";

type ResetPasswordBlockErrorProps = {
  text: string;
};

export const ResetPasswordBlockError: React.FC<ResetPasswordBlockErrorProps> = ({ text }) => {
  return <h2 className={`${s.title} ${s.titleRed} ${cs.title}`}>{text}</h2>;
};
