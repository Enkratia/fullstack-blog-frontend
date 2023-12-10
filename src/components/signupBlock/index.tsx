"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useImmer } from "use-immer";

import { useValidateForm } from "../../utils/customHooks";
import { FRONTEND_URL } from "../../utils/constants";

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

  const router = useRouter();
  const [fields, setFields] = useImmer(initialFields);

  const {
    isValidText,
    validateText,
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,
    isValidPassConfirm,
    validatePassConfirm,
  } = useValidateForm();

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  // **
  const validateForm = () => {
    return [isValidText, isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
      el.includes("inputWrapperSuccess"),
    );
  };

  // **
  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setFields((o) => {
      o.fullname = e.target.value;
      return o;
    });

    validateText(e.target.value, idx);
  };

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

    await signIn("credentials", {
      ...fields,
      redirect: false,
    });

    router.push(callbackUrl);
  };

  return (
    <form className={s.root}>
      <p className={`${s.title} ${cs.title}`}>Sign-up</p>

      <div className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidText[0]]}`}>
        <input
          onChange={(e) => onFullnameChange(e, 0)}
          className={`${s.input} ${cs.input}`}
          type="text"
          placeholder="Fullname"
          value={fields.fullname}
        />
      </div>

      <div
        className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidEmail]}`}
        data-validity="email">
        <input
          onChange={onEmailChange}
          className={`${s.input} ${cs.input}`}
          type="text"
          placeholder="Email"
          value={fields.email}
        />
      </div>

      <div
        className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidPassLength]}`}
        data-validity="pass-length">
        <input
          onChange={onPasswordChange}
          className={`${s.input} ${cs.input}`}
          type="password"
          placeholder="Password"
          value={fields.password}
        />
      </div>

      <div
        className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidPassConfirm]}`}
        data-validity="pass-confirm">
        <input
          onChange={onPasswordConfirmChange}
          className={`${s.input} ${cs.input}`}
          type="password"
          placeholder="Password"
          value={fields.passwordConfirm}
        />
      </div>

      <button onClick={onSubmit} className={`${s.btn} ${cs.btn} ${cs.btnLg}`} type="submit">
        Submit
      </button>

      <div className={s.descr}>
        <span className={s.descrText}>Already have an account?</span>
        <Link href={`/signin${callback}`} className={s.descrLink} scroll={false}>
          Sign-in
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
