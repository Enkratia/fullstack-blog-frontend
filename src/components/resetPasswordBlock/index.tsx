"use client";

import React from "react";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useParams, useSearchParams } from "next/navigation";

import { useCreateUserMutation, useVerifyResetQuery } from "../../redux/backendApi";

import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import { ConfirmEmail } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";

const initialFields = {
  password: "",
  passwordConfirm: "",
};

export const ResetPasswordBlock: React.FC = () => {
  // const callback = `?callbackUrl=${callbackUrl}`;
  const formRef = React.useRef<HTMLFormElement>(null);
  const token = useParams().token.toString();

  const { data, isError } = useVerifyResetQuery({ token }, { skip: !token });

  const [createUser, { isSuccess }] = useCreateUserMutation();
  const { authMessage, setAuthError } = useAuthErrorMessage();

  const [fields, setFields] = useImmer(initialFields);
  const { isValidPassLength, validatePassLength, isValidPassConfirm, validatePassConfirm } =
    useValidateForm();

  if (isError) {
    return (
      <h2 className={cs.title} style={{ textAlign: "center" }}>
        Something went wrong
      </h2>
    );
  }

  if (!data) {
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

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Reset password</p>

      {isSuccess ? (
        ""
      ) : (
        <div className={s.content}>
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
