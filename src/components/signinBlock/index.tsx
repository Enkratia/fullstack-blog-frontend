"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useImmer } from "use-immer";

import { ShowPassBtn } from "../../components";
import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "./signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

type SigninBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const SigninBlock: React.FC<SigninBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const { authMessage, setAuthError } = useAuthErrorMessage();

  const callback = `?callbackUrl=${callbackUrl}`;

  const [fields, setFields] = useImmer({ email: "", password: "" });
  const [isShowPass, setIsShowPass] = React.useState(false);

  const {
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,

    // **
    formRef,
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

    validatePassLength(e.target, { single: true });
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateAllSuccessForm()) {
      setIsValidate(true);
      return;
    }

    const res = await signIn("credentials", {
      email: fields.email,
      password: fields.password,
      redirect: false,
    });

    if (res && !res.ok) {
      if (res.error === "EmailOrPasswordAreIncorrect" || res.error === "EmailNotVerfied") {
        setAuthError(res.error);
        return;
      }

      setAuthError("FetchError");
      return;
    }

    window.location.assign(callbackUrl);
  };

  return (
    <form onClick={(e) => e.preventDefault} className={s.root} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-in</p>

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

      {/* <FormInput
        onChange={onEmailChange}
        onValidate={(e) => validateEmail(e.target)}
        inputClassName={`${s.input} ${cs.input}`}
        type="text"
        placeholder="Email"
      /> */}

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassLength}>
        <input
          onChange={onPasswordChange}
          className={`${s.input} ${cs.input}`}
          type={isShowPass ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={fields.password}
        />

        <ShowPassBtn isShowPass={isShowPass} setIsShowPass={() => setIsShowPass((b) => !b)} />
      </div>

      <div className={`${cs.btnWrapper} ${s.btnWrapper}`} {...authMessage}>
        <button onClick={onSubmit} className={`${s.btn} ${cs.btn} ${cs.btnLg}`} type="submit">
          Submit
        </button>
      </div>

      <div className={s.descr}>
        <div className={s.descrWrapper}>
          <span className={s.descrText}>Don&apos;t have an account?</span>
          <Link href={`/auth/signup${callback}`} className={s.descrLink} scroll={false}>
            Sign-up
          </Link>
        </div>

        <Link
          href={`/auth/forgot${callback}`}
          className={`${s.descrLink} ${s.descrLinkRight}`}
          scroll={false}>
          Forgot password?
        </Link>
      </div>

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

// Workaround when no data resetted(reload) after login (just router.push() or nothing at all)
// try {
//   await revalidatePathAction();
// } catch {
//   console.log(`Failed to revalidate ${window.location.pathname}`);
// }
// // reinitApp();
// router.push(callbackUrl);
