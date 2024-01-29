"use client";

import React from "react";
import Link from "next/link";

import { useCheckUserEmailMutation } from "../../redux/backendApi";
import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";
import Close from "../../../public/img/close.svg";
import { EmailSent } from "./emailSent";

type ForgotBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const ForgotBlock: React.FC<ForgotBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const callback = `?callbackUrl=${callbackUrl}`;

  const { authMessage, setAuthError } = useAuthErrorMessage();
  const { isValidEmail, validateEmail } = useValidateForm();

  const [email, setEmail] = React.useState("");
  const [checkUserEmail, { isSuccess }] = useCheckUserEmailMutation();

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  // **
  const validateForm = () => {
    return [isValidEmail].every((el) =>
      !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success"),
    );
  };

  // **
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const res = await checkUserEmail(formData);

    if ("error" in res) {
      if ("status" in res.error) {
        if (res.error.status === 404) {
          setAuthError("EmailNotFound");
          return;
        }
      }

      setAuthError("FetchError");
      return;
    }
  };

  return (
    <form onClick={(e) => e.preventDefault} className={s.root} ref={formRef}>
      {isSuccess ? (
        <EmailSent email={email} />
      ) : (
        <div className={s.content}>
          <p className={`${s.title} ${cs.title}`}>Forgot password?</p>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
            <input
              onChange={onEmailChange}
              className={`${s.input} ${cs.input}`}
              type="text"
              placeholder="Email"
              value={email}
              name="email"
            />
          </div>

          <div className={`${cs.btnWrapper} ${s.btnWrapper}`} {...authMessage}>
            <button
              onClick={onSubmit}
              className={`${s.btn} ${cs.btn} ${cs.btnLg}`}
              disabled={!validateForm()}
              type="submit">
              Submit
            </button>
          </div>

          <div className={s.descr}>
            <div className={s.descrWrapper}>
              <Link href={`/auth/signin${callback}`} className={s.descrLink} scroll={false}>
                Return to Sign-in page
              </Link>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onCloseClick}
        className={s.close}
        aria-label="Close the modal window."
        type="button">
        <Close aria-hidden={true} />
      </button>
    </form>
  );
};
