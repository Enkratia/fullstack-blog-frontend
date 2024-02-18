"use client";

import { IMaskInput } from "react-imask";

import React from "react";

import { useGetContactUsQuery, useUpdateContactUsMutation } from "../../../redux/backendApi";

import { SkeletonDashboardForm } from "../../../components";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

export const EditContactUsSection1Block: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const phoneRef = React.useRef(null);

  const { data, isError: isGetError } = useGetContactUsQuery();
  const info = data?.[0];

  const [updateContactUs, { isError, isSuccess, isLoading }] = useUpdateContactUsMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText, isValidPhone, validatePhone, isValidEmail, validateEmail } =
    useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText, isValidPhone, isValidEmail]
      .flat()
      .every((el) => (!el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning")));
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current || !validateForm()) return;

    const formData = new FormData(formRef.current);
    updateContactUs(formData);
  };

  if (!info) {
    return <SkeletonDashboardForm />;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Contact us</h2>

      <form className={s.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
            <input
              type="text"
              onChange={(e) => validateEmail(e.target.value)}
              className={`${s.input} ${cs.input}`}
              name="contactEmail"
              defaultValue={info.contact.email}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPhone}>
            <IMaskInput
              ref={phoneRef}
              mask="000 0000 0000"
              onAccept={(value: string) => validatePhone(value)}
              type="text"
              className={`${s.input} ${cs.input}`}
              name="contactPhone"
              placeholder="Phone"
              defaultValue={info.contact.phone}
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
              name="headerSubtitle"
              defaultValue={info.header.subtitle}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 2)}
              className={`${s.input} ${cs.input}`}
              name="headerDescription"
              defaultValue={info.header.description}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[3]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 3)}
              className={`${s.input} ${cs.input}`}
              name="timeDays"
              defaultValue={info.time.days}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[4]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 4)}
              className={`${s.input} ${cs.input}`}
              name="timeHours"
              defaultValue={info.time.hours}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[5]}>
            <textarea
              onChange={(e) => validateText(e.target.value, 5)}
              className={`${s.input} ${cs.input}`}
              name="timeDescription"
              defaultValue={info.time.description}
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
