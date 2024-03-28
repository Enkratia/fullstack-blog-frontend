"use client";

import React from "react";
import Link from "next/link";
import { useImmer } from "use-immer";

import { useCreateUserMutation } from "../../redux/backendApi";

import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import { ShowPassBtn, SignupBlockSuccess } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

type SignupBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

const initialFields = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const SignupBlock: React.FC<SignupBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const callback = `?callbackUrl=${callbackUrl}`;
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createUser, { isSuccess }] = useCreateUserMutation();

  const { authMessage, setAuthError } = useAuthErrorMessage();

  const [fields, setFields] = useImmer(initialFields);
  const [isShowPass, setIsShowPass] = useImmer([false, false]);

  const {
    isValidText,
    validateText,
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,
    isValidPassConfirm,
    validatePassConfirm,

    // **
    validateAllSuccessForm,
    setIsValidate,
  } = useValidateForm();

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  // **
  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setFields((o) => {
      o.fullname = e.target.value;
      return o;
    });

    validateText(e.target, idx);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.email = e.target.value;
      return o;
    });

    validateEmail(e.target);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });

    validatePassLength(e.target);
  };

  const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.passwordConfirm = e.target.value;
      return o;
    });

    validatePassConfirm(e.target);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(validateAllSuccessForm());
    if (!validateAllSuccessForm()) {
      setIsValidate(true);
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.delete("confirmPassword");

    const res = await createUser(formData);

    if ("error" in res) {
      if ("status" in res.error) {
        if (res.error.status === 409) {
          setAuthError("EmailRegistered");
          return;
        }
      }

      setAuthError("FetchError");
      return;
    }
  };

  // **
  const onShowPassBtnClick = (idx: number) => {
    setIsShowPass((o) => {
      o[idx] = !o[idx];
      return o;
    });
  };

  const testRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!testRef.current) return;
    // validateText(testRef.current, 0);
    console.log(testRef.current);
  });

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-up</p>

      {isSuccess ? (
        <SignupBlockSuccess email={fields.email} />
      ) : (
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
            <input
              ref={testRef}
              onChange={(e) => onFullnameChange(e, 0)}
              className={`${s.input} ${cs.input}`}
              type="text"
              name="fullname"
              placeholder="Fullname"
              value={fields.fullname}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
            <input
              onChange={onEmailChange}
              className={`${s.input} ${cs.input}`}
              type="text"
              name="email"
              placeholder="Email"
              value={fields.email}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassLength}>
            <input
              onChange={onPasswordChange}
              className={`${s.input} ${cs.input}`}
              type={isShowPass[0] ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={fields.password}
            />

            <ShowPassBtn isShowPass={isShowPass[0]} setIsShowPass={() => onShowPassBtnClick(0)} />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassConfirm}>
            <input
              onChange={onPasswordConfirmChange}
              className={`${s.input} ${cs.input}`}
              type={isShowPass[1] ? "text" : "password"}
              name="confirmPassword"
              placeholder="Password"
              value={fields.passwordConfirm}
            />

            <ShowPassBtn isShowPass={isShowPass[1]} setIsShowPass={() => onShowPassBtnClick(1)} />
          </div>

          <div className={`${cs.btnWrapper} ${s.btnWrapper}`} {...authMessage}>
            <button onClick={onSubmit} className={`${s.btn} ${cs.btn} ${cs.btnLg}`} type="submit">
              Submit
            </button>
          </div>

          <div className={s.descr}>
            <div className={s.descrWrapper}>
              <span className={s.descrText}>Already have an account?</span>
              <Link href={`/auth/signin${callback}`} className={s.descrLink} scroll={false}>
                Sign-in
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
