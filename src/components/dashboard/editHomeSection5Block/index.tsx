"use client";

import React from "react";

import { useUpdateWhyWeStartedStaticMutation } from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./editHomeSection5Block.module.scss";

type EditHomeSection5BlockProps = {
  data: WhyWeStartedType;
};

export const EditHomeSection5Block: React.FC<EditHomeSection5BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateWhyWeStarted, { isError, isSuccess, isLoading }] =
    useUpdateWhyWeStartedStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText, isValidFile, validateFile } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText, isValidFile]
      .flat()
      .every((el) => (!el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning")));
  };

  // **
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateFile(e.target.files);
  };

  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current || !validateForm()) return;

    const formData = new FormData(formRef.current);
    updateWhyWeStarted(formData);
  };

  return (
    <form className={s.root} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <h2 className={`${s.title} ${cs.title}`}>Section 5</h2>

      <div className={s.content}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidFile}>
          <button onClick={onUploadClick} type="button" className={cs.btn}>
            Upload picture
          </button>

          <input
            onChange={onFileChange}
            type="file"
            accept=".png, .jpg, .jpeg, .svg"
            name="file"
            hidden
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 0)}
            className={`${s.input} ${cs.input}`}
            name="title"
            defaultValue={data.title}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 1)}
            className={`${s.input} ${cs.input}`}
            name="subtitle"
            defaultValue={data.subtitle}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
          <textarea
            onChange={(e) => validateText(e.target.value, 2)}
            className={`${s.input} ${cs.input}`}
            name="description"
            defaultValue={data.description}
            rows={4}
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
