"use client";

import React from "react";
import { useImmer } from "use-immer";
import { useParams } from "next/navigation";

import { useResetPasswordMutation, useVerifyResetQuery } from "../../redux/backendApi";

import { ResetPasswordBlockError, ResetPasswordBlockSuccess } from "../../components";
import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";

const initialFields = {
  password: "",
  passwordConfirm: "",
};

export const ResetPasswordBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const token = useParams().token.toString();

  const {
    data: verificationData,
    isError: isVerificationError,
    error: verificationError,
  } = useVerifyResetQuery(token);

  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const { authMessage, setAuthError } = useAuthErrorMessage();

  const [fields, setFields] = useImmer(initialFields);
  const { isValidPassLength, validatePassLength, isValidPassConfirm, validatePassConfirm } =
    useValidateForm();

  if (isVerificationError) {
    if ("status" in verificationError && verificationError.status === 410) {
      return <ResetPasswordBlockError text="The link you followed has expired" />;
    } else {
      return <ResetPasswordBlockError text="Something went wrong" />;
    }
  }

  if (!verificationData) {
    return;
  }

  // **
  const validateForm = () => {
    return [isValidPassLength, isValidPassConfirm].every((el) =>
      !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success"),
    );
  };

  // **
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });

    validatePassLength(e.target.value);
  };

  const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.passwordConfirm = e.target.value;
      return o;
    });

    validatePassConfirm(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.delete("confirmPassword");

    const res = await resetPassword({
      token: token,
      body: formData,
    });

    if ("error" in res) {
      setAuthError("FetchError");
    }
  };

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      {isSuccess ? (
        <ResetPasswordBlockSuccess />
      ) : (
        <div className={s.content}>
          <p className={`${s.title} ${cs.title}`}>Reset password</p>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassLength}>
            <input
              onChange={onPasswordChange}
              className={`${s.input} ${cs.input}`}
              type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
            />
          </div>

          <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassConfirm}>
            <input
              onChange={onPasswordConfirmChange}
              className={`${s.input} ${cs.input}`}
              type="password"
              name="confirmPassword"
              placeholder="Password"
              value={fields.passwordConfirm}
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
        </div>
      )}
    </form>
  );
};
