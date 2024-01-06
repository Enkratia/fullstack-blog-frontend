"use client";

import React from "react";

import { useLazyCreateSubscribeQuery } from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./footerMid.module.scss";

export const FooterMid: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { isValidEmail, validateEmail } = useValidateForm();

  const [createSubscribe, { isError, isSuccess, isFetching, isLoading }] =
    useLazyCreateSubscribeQuery();
  const requestStatus = checkRequestStatus(isError, isSuccess, isFetching, isLoading);

  // **
  const validateForm = () => {
    return [isValidEmail].every((el) =>
      !el ? !!el : Object.keys(el)[0].includes("data-validity-success"),
    );
  };

  const onSubmit = () => {
    const form = formRef.current;
    if (!form || !validateForm()) return;

    const formdata = new FormData(form);
    createSubscribe(formdata);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
  };

  return (
    <div className={s.root}>
      <h2 className={cs.srOnly}>Form to subscribe for lastest updates</h2>
      <p className={`${s.title} ${cs.title}`}>
        Subscribe to&nbsp;our news letter to&nbsp;get latest updates and news
      </p>

      <form className={s.form} onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <div className={`${cs.inputWrapper} ${s.inputWrapper}`} {...isValidEmail}>
          <input
            onChange={onInputChange}
            type="text"
            placeholder="Enter Your Email"
            name="email"
            className={`${s.input} ${cs.input}`}
          />
        </div>

        <div className={`${cs.btnWrapper} ${cs[requestStatus]}`}>
          <button onClick={onSubmit} type="submit" className={`${s.btn} ${cs.btn}`}>
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};
