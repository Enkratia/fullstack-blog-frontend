"use client";

import { IMaskInput } from "react-imask";

import React from "react";

import { useUpdateFooterBottomMutation } from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

type EditFooterSection1BlockProps = {
  data: FooterBottomType;
};

export const EditFooterSection1Block: React.FC<EditFooterSection1BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const phoneRef = React.useRef(null);

  const [updateFooterBottom, { isError, isSuccess, isLoading }] = useUpdateFooterBottomMutation();
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
    updateFooterBottom(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Footer</h2>

      <form className={s.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
            <input
              type="text"
              onChange={(e) => validateEmail(e.target.value)}
              className={`${s.input} ${cs.input}`}
              name="email"
              defaultValue={data.email}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPhone}>
            <IMaskInput
              ref={phoneRef}
              mask="000 0000 0000"
              onAccept={(value: string) => validatePhone(value)}
              type="text"
              className={`${s.input} ${cs.input}`}
              name="phone"
              placeholder="Phone"
              defaultValue={data.phone}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
            <textarea
              spellCheck={false}
              onChange={(e) => validateText(e.target.value, 0)}
              className={`${s.input} ${cs.input}`}
              name="address"
              defaultValue={data.address}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
            <input
              type="text"
              onChange={(e) => validateText(e.target.value, 1)}
              className={`${s.input} ${cs.input}`}
              name="facebook"
              defaultValue={data.socialLinks.facebook}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
            <input
              type="text"
              onChange={(e) => validateText(e.target.value, 2)}
              className={`${s.input} ${cs.input}`}
              name="instagram"
              defaultValue={data.socialLinks.instagram}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[3]}>
            <input
              type="text"
              onChange={(e) => validateText(e.target.value, 3)}
              className={`${s.input} ${cs.input}`}
              name="linkedin"
              defaultValue={data.socialLinks.linkedin}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[4]}>
            <input
              type="text"
              onChange={(e) => validateText(e.target.value, 4)}
              className={`${s.input} ${cs.input}`}
              name="twitter"
              defaultValue={data.socialLinks.twitter}
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
