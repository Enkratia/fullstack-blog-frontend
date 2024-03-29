"use client";

import React from "react";
import Link from "next/link";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCheckUserEmailMutation } from "../../redux/backendApi";

import { FormInput, FormSubmit } from "../../components";
import { ForgotBlockSuccess } from "./forgotBlockSuccess";
import { useAuthErrorMessage } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type InputType = z.infer<typeof FormSchema>;

type ForgotBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const ForgotBlock: React.FC<ForgotBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const callback = `?callbackUrl=${callbackUrl}`;

  const { authMessage, setAuthError } = useAuthErrorMessage();
  const [checkUserEmail, { isSuccess }] = useCheckUserEmailMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  const onSubmit = async () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className={s.root} ref={formRef}>
      {isSuccess ? (
        <ForgotBlockSuccess email={getValues().email} />
      ) : (
        <div className={s.content}>
          <p className={`${s.title} ${cs.title}`}>Forgot password?</p>

          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.email?.message}
            register={register}
            name="email"
            type="text"
            placeholder="Email"
          />

          <FormSubmit
            classNameWrapper={`${s.btnWrapper} ${cs.btnWrapper}`}
            classNameBtn={`${s.submit} ${cs.btn} ${cs.btnLg}`}
            text="Submit"
            requestStatus={authMessage}
          />

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
