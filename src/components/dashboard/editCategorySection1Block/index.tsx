"use client";

import React from "react";

import {
  useGetCategoryHeaderQuery,
  useUpdateUsMissionStaticMutation,
} from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./editCategorySection1Block.module.scss";

export const EditCategorySection1Block: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data, isError: isGetError } = useGetCategoryHeaderQuery();
  const info = data?.[0];

  const [updateUsMission, { isError, isSuccess, isLoading }] = useUpdateUsMissionStaticMutation();
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
    updateUsMission(formData);
  };

  if (!data) {
    return;
  }

  console.log(data);

  return (
    <form className={s.root} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <h2 className={`${s.title} ${cs.title}`}>Section 3</h2>

      <div className={s.content}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 0)}
            className={`${s.input} ${cs.input}`}
            name="aboutTitle"
            defaultValue={data[0].description}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 1)}
            className={`${s.input} ${cs.input}`}
            name="aboutDescription"
            // defaultValue={data.about.description}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 2)}
            className={`${s.input} ${cs.input}`}
            name="missionTitle"
            // defaultValue={data.mission.title}
            rows={3}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[3]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 3)}
            className={`${s.input} ${cs.input}`}
            name="missionDescription"
            // defaultValue={data.mission.description}
            rows={3}
          />
        </div>

        <div className={cs.btnWrapper} {...requestStatus}>
          <button onClick={onSubmit} type="button" className={cs.btn} disabled={!validateForm()}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
