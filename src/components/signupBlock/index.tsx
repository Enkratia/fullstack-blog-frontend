"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useImmer } from "use-immer";

import { useLazyCreateUserQuery } from "../../redux/backendApi";

import { ConfirmEmail } from "../../components";
import { useAuthErrorMessage, useValidateForm } from "../../utils/customHooks";
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
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createUser] = useLazyCreateUserQuery();
  const { authMessage, setAuthError } = useAuthErrorMessage();
  const [isRegistered, setIsRegistered] = React.useState(false);

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
    return [isValidText[0], isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
      !el ? !!el : Object.keys(el)[0].includes("data-validity-success"),
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

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.delete("confirmPassword");

    const { error } = await createUser(formData);

    if (error) {
      if ("status" in error) {
        if (error.status.toString().startsWith("4")) {
          setAuthError("EmailRegistered");
          return;
        }
      }

      setAuthError("ServerError");
      return;
    }

    setIsRegistered(true);
    // const res = await signIn("credentials", {
    //   ...fields,
    //   redirect: false,
    // });

    // if (res && !res.ok) {
    //   setAuthError(res.error || "");
    //   return;
    // }

    // router.push(callbackUrl);
  };

  // console.log(result.error);
  // if ("data" in error) {
  // }

  console.log(isRegistered);

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-up</p>

      <div className={s.content}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
          <input
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
          <button onClick={onSubmit} className={`${s.btn} ${cs.btn} ${cs.btnLg}`} type="submit">
            Submit
          </button>
        </div>

        <div className={s.descr}>
          <span className={s.descrText}>Already have an account?</span>
          <Link href={`/signin${callback}`} className={s.descrLink} scroll={false}>
            Sign-in
          </Link>
        </div>

        <ConfirmEmail email={fields.email} isRegistered={isRegistered} />
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
