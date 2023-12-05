"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useImmer } from "use-immer";

import { FRONTEND_URL } from "../../utils/constants";

import cs from "../../scss/helpers.module.scss";
import s from "./signinBlock.module.scss";
import Link from "next/link";

type SigninBlockProps = {
  callbackUrl: string;
};

export const SigninBlock: React.FC<SigninBlockProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const [fields, setFields] = useImmer({ email: "", password: "" });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.email = e.target.value;
      return o;
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = await signIn("credentials", {
      email: fields.email,
      password: fields.password,
      redirect: false,
    });

    router.push(callbackUrl || FRONTEND_URL);
  };

  return (
    <form className={`${s.root} ${cs.container} ${cs.container768}`}>
      <p className={`${s.title} ${cs.title}`}>Sign-in</p>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`}>
        <input
          onChange={onEmailChange}
          className={`${s.input} ${cs.input}`}
          type="text"
          placeholder="Email"
          value={fields.email}
        />
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`}>
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
        <span className={s.descrText}>Don't have an account?</span>
        <Link href="/signup" className={s.descrLink}>
          Sign-up
        </Link>
      </div>
    </form>
  );
};
