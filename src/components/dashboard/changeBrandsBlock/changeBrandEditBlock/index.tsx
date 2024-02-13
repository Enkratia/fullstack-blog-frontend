"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useUpdateBrandMutation, useGetBrandByIdQuery } from "../../../../redux/backendApi";

import { useValidateForm } from "../../../../utils/customHooks";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeBrandEditBlock.module.scss";

export const ChangeBrandEditBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const id = useParams().id;

  const { data: brand, isError: isGetError } = useGetBrandByIdQuery(+id);

  const [
    updateBrand,
    { isError: isUpdateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading },
  ] = useUpdateBrandMutation();
  const requestStatus = checkRequestStatus(isUpdateError, isUpdateSuccess, isUpdateLoading);

  const { isValidText, validateText, isValidFile, validateFile } = useValidateForm();

  if (!brand) {
    return;
  }

  // **
  const validateForm = () => {
    return [isValidText, isValidFile]
      .flat()
      .every((el) => (!el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning")));
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form || !validateForm()) return;

    const formData = new FormData(form);

    updateBrand({
      id: brand.id,
      body: formData,
    });
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
      <h2 className={`${s.title} ${cs.title}`}>Edit brand</h2>

      <form className={s.form} onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 0)}
            defaultValue={brand.title}
          />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
          <input
            type="text"
            placeholder="Link"
            name="linkUrl"
            className={`${s.input} ${cs.input}`}
            onChange={(e) => validateText(e.target.value, 1)}
            defaultValue={brand.linkUrl}
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
