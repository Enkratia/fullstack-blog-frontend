"use client";

import React from "react";

import {
  useGetCategoryHeaderQuery,
  useUpdateCategoryHeaderMutation,
} from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { SkeletonDashboardForm } from "../../../components";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

export const EditCategorySection1Block: React.FC = () => {
  const dispatch = useAppDispatch();
  const formRef = React.useRef<HTMLFormElement>(null);

  const {
    data,
    isError: isGetError,
    originalArgs: originalGetArgs,
    endpointName: endpointGetName,
  } = useGetCategoryHeaderQuery();

  // **
  const [updateCategoryHeader, { isError, isSuccess, isLoading }] =
    useUpdateCategoryHeaderMutation();
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
    updateCategoryHeader(formData);
  };

  // **
  React.useEffect(() => {
    if (isGetError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointGetName + "" + originalGetArgs,
          text: "Failed to load data.",
        }),
      );
    }
  }, [isGetError]);

  //  **
  if (!data) {
    return <SkeletonDashboardForm />;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Category</h2>

      <form className={s.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 0)}
              className={`${s.input} ${cs.input}`}
              name="startup"
              defaultValue={data.startup}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 1)}
              className={`${s.input} ${cs.input}`}
              name="economy"
              defaultValue={data.economy}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 2)}
              className={`${s.input} ${cs.input}`}
              name="business"
              defaultValue={data.business}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[3]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 3)}
              className={`${s.input} ${cs.input}`}
              name="technology"
              defaultValue={data.technology}
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
