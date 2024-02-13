"use client";

import React from "react";

import { useCreateQueryMutation } from "../../../../redux/backendApi";

import { useValidateForm } from "../../../../utils/customHooks";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeQueriesCreateBlock.module.scss";

export const ChangeQueriesCreateBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createQuery, { isError, isSuccess, isLoading }] = useCreateQueryMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText[0]].every((el) =>
      !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success"),
    );
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form || !validateForm()) return;

    const formData = new FormData(form);
    createQuery(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Create query</h2>

      <form className={s.form} onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <textarea
            placeholder="Query"
            name="content"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 0)}
          />
        </div>

        <div className={`${cs.btnWrapper} ${cs.btnWrapper}`} {...requestStatus}>
          <button className={`${s.btn} ${cs.btn}`} disabled={!validateForm()} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
