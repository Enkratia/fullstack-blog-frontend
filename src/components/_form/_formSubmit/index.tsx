import React from "react";

import cs from "../../../scss/helpers.module.scss";

type FormSubmitProps = {
  classNameWrapper: string;
  classNameBtn: string;
  requestStatus: Record<string, string>;
  text: string;
};

export const FormSubmit: React.FC<FormSubmitProps> = ({
  classNameWrapper,
  classNameBtn,
  requestStatus,
  text,
}) => {
  return (
    <div className={`${classNameWrapper} ${cs.btnWrapper}`} {...requestStatus}>
      <button className={classNameBtn} type="submit">
        {text}
      </button>

      <strong className={cs.btnMessage}>{Object.values(requestStatus)[0]}</strong>
    </div>
  );
};

/* <FormSubmit
  classNameWrapper=""
  classNameBtn={`${s.submit} ${cs.btn} ${cs.btnLg}`}
  text="Send Message"
  requestStatus={requestStatus}
/>; */
