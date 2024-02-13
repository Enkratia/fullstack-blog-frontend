"use client";

import React from "react";

import { useCreateTestimonialMutation } from "../../../../redux/backendApi";

import { useValidateForm } from "../../../../utils/customHooks";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeTestimonialCreateBlock.module.scss";

export const ChangeTestimonialCreateBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createTestimonial, { isError, isSuccess, isLoading }] = useCreateTestimonialMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText, isValidFile, validateFile } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText, isValidFile]
      .flat()
      .every((el) => (!el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success")));
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form || !validateForm()) return;

    const formData = new FormData(form);
    createTestimonial(formData);
  };

  // **
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateFile(e.target.files);
  };

  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Create new Testimonial</h2>

      <form className={s.form} onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <input
            type="text"
            placeholder="Fullname"
            name="fullname"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 0)}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
          <input
            type="text"
            placeholder="Address"
            name="address"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 1)}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
          <textarea
            placeholder="Text"
            name="text"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 2)}
            rows={5}
          />
        </div>

        <div className={`${s.btnWrapper} ${cs.inputWrapper}`} {...isValidFile}>
          <button onClick={onUploadClick} type="button" className={`${s.btnd} ${cs.btn}`}>
            Upload picture
          </button>

          <input onChange={onFileChange} type="file" accept=".png" name="file" hidden />
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
