"use client";

import React from "react";
import { useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useResetPasswordMutation, useVerifyResetQuery } from "../../redux/backendApi";

import {
  FormInput,
  FormSubmit,
  ResetPasswordBlockError,
  ResetPasswordBlockSuccess,
} from "../../components";
import { useAuthErrorMessage } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password should be atleast 6 characters")
      .max(45, "Password must be less than 45 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should be atleast 6 characters")
      .max(45, "Password must be less than 45 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

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

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, submitCount },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const password = watch("password");
  React.useEffect(() => {
    if (!submitCount) return;
    trigger("confirmPassword");
  }, [password, trigger, submitCount]);

  // **
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

  const onSubmit = async () => {
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
    <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      {isSuccess ? (
        <ResetPasswordBlockSuccess />
      ) : (
        <div className={s.content}>
          <p className={`${s.title} ${cs.title}`}>Reset password</p>

          <FormInput
            isPass={true}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.password?.message}
            register={register}
            name="password"
            type="password"
            placeholder="Password"
          />

          <FormInput
            isPass={true}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.confirmPassword?.message}
            register={register}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          <FormSubmit
            classNameWrapper={`${cs.btnWrapper} ${s.btnWrapper}`}
            classNameBtn={`${s.btn} ${cs.btn} ${cs.btnLg}`}
            text="Submit"
            requestStatus={authMessage}
          />
        </div>
      )}
    </form>
  );
};
