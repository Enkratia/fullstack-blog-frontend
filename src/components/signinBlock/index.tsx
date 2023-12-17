"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useImmer } from "use-immer";

import { useValidateForm } from "../../utils/customHooks";
import { FRONTEND_URL } from "../../utils/constants";

import cs from "../../scss/helpers.module.scss";
import s from "./signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

type SigninBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const SigninBlock: React.FC<SigninBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const callback = `?callbackUrl=${callbackUrl}`;

  const router = useRouter();
  const [fields, setFields] = useImmer({ email: "", password: "" });

  const { isValidEmail, validateEmail, isValidPassLength, validatePassLength } = useValidateForm();

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  // **
  const validateForm = () => {
    return [isValidEmail, isValidPassLength].every((el) =>
      Object.keys(el)[0].includes("data-validity-success"),
    );
  };

  // **
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.email = e.target.value;
      return o;
    });

    validateEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });

    validatePassLength(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    await signIn("credentials", {
      email: fields.email,
      password: fields.password,
      redirect: false,
    });

    router.push(callbackUrl);
  };

  return (
    <form onClick={(e) => e.preventDefault} className={s.root}>
      <p className={`${s.title} ${cs.title}`}>Sign-in</p>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
        <input
          onChange={onEmailChange}
          className={`${s.input} ${cs.input}`}
          type="text"
          placeholder="Email"
          value={fields.email}
        />
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidPassLength}>
        <input
          onChange={onPasswordChange}
          className={`${s.input} ${cs.input}`}
          type="password"
          placeholder="Password"
          value={fields.password}
        />
      </div>

      <button onClick={onSubmit} className={`${s.btn} ${cs.btn} ${cs.btnLg}`} type="submit">
        Submit
      </button>

      <div className={s.descr}>
        <span className={s.descrText}>Don&apos;t have an account?</span>
        <Link href={`/signup${callback}`} className={s.descrLink} scroll={false}>
          Sign-up
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
