"use client";

import React from "react";

import { useUpdateJoinMutation } from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

type EditHomeSection9BlockProps = {
  data: JoinType;
};

export const EditHomeSection9Block: React.FC<EditHomeSection9BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateJoin, { isError, isSuccess, isLoading }] = useUpdateJoinMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText]
      .flat()
      .every((el) => (!el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning")));
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current || !validateForm()) return;

    const formData = new FormData(formRef.current);
    updateJoin(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 9</h2>

      <form className={s.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 0)}
              className={`${s.input} ${cs.input}`}
              name="title"
              defaultValue={data.title}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 1)}
              className={`${s.input} ${cs.input}`}
              name="description"
              defaultValue={data.description}
            />
          </div>

          <div className={cs.btnWrapper} {...requestStatus}>
            <button onClick={onSubmit} type="button" className={cs.btn} disabled={!validateForm()}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
