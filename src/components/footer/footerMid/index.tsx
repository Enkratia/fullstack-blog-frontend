"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateSubscribeMutation } from "../../../redux/backendApi";

import { FormInput, FormSubmit } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./footerMid.module.scss";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type InputType = z.infer<typeof FormSchema>;

export const FooterMid: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createSubscribe, { isError, isSuccess, isLoading }] = useCreateSubscribeMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const formdata = new FormData(form);
    createSubscribe(formdata);
  };

  return (
    <div className={s.root} id="subscribe-form">
      <h2 className={cs.srOnly}>Form to subscribe for lastest updates</h2>
      <p className={`${s.title} ${cs.title}`}>
        Subscribe to&nbsp;our news letter to&nbsp;get latest updates and news
      </p>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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

        <FormSubmit
          classNameWrapper={`${s.btnWrapper} ${cs.btnWrapper}`}
          classNameBtn={`${s.btn} ${cs.btn}`}
          text="Subscribe"
          requestStatus={requestStatus}
        />
      </form>
    </div>
  );
};
