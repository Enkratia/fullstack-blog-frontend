"use client";

import React from "react";

import {
  useGetAboutUsStaticQuery,
  useUpdateAboutUsStaticMutation,
} from "../../../redux/backendApi";

import { SkeletonDashboardForm } from "../../../components";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

export const EditAboutUsSection1Block: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateAboutUsStatic, { isError, isSuccess, isLoading }] = useUpdateAboutUsStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { data, isError: isGetError } = useGetAboutUsStaticQuery();
  const info = data?.[0];

  const { isValidText, validateText, isValidFile, validateFile } = useValidateForm();

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
    updateAboutUsStatic(formData);
  };

  if (!info) {
    return <SkeletonDashboardForm />;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 1</h2>

      <form className={s.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
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
              name="headerTitle"
              defaultValue={info.header.title}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 1)}
              className={`${s.input} ${cs.input}`}
              name="headerDescription"
              defaultValue={info.header.description}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 2)}
              className={`${s.input} ${cs.input}`}
              name="missionTitle"
              defaultValue={info.mission.title}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[3]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 3)}
              className={`${s.input} ${cs.input}`}
              name="missionDescription"
              defaultValue={info.mission.description}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[4]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 4)}
              className={`${s.input} ${cs.input}`}
              name="visionTitle"
              defaultValue={info.vision.title}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[5]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 5)}
              className={`${s.input} ${cs.input}`}
              name="visionDescription"
              defaultValue={info.vision.description}
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
