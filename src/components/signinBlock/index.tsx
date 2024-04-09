"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput, FormSubmit } from "../../components";
import { useAuthErrorMessage } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "./signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password should be atleast 6 characters")
    .max(45, "Password should be less than 45 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type SigninBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const SigninBlock: React.FC<SigninBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const callback = `?callbackUrl=${callbackUrl}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const { authMessage, setAuthError } = useAuthErrorMessage();

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
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
    <form onSubmit={handleSubmit(onSubmit)} className={s.root} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-in</p>

      <FormInput
        id=""
        isPass={false}
        classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
        classNameInput={`${s.input} ${cs.input}`}
        error={errors?.email?.message}
        register={register}
        name="email"
        type="text"
        placeholder="Email"
      />

      <FormInput
        id=""
        isPass={true}
        classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
        classNameInput={`${s.input} ${cs.input}`}
        error={errors?.password?.message}
        register={register}
        name="password"
        type="password"
        placeholder="Password"
      />

      <FormSubmit
        classNameWrapper={`${s.btnWrapper} ${cs.btnWrapper}`}
        classNameBtn={`${s.btn} ${cs.btn} ${cs.btnLg}`}
        text="Submit"
        requestStatus={authMessage}
      />

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
