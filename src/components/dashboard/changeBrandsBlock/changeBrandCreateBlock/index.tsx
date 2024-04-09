"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateBrandMutation } from "../../../../redux/backendApi";

import { FormFileInput, FormInput, FormSubmit } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeBrandCreateBlock.module.scss";

const ImageSchema = z
  .any()
  .refine((files) => files?.length >= 1, { message: "Picture is required" })
  .optional();

const FormSchema = z.object({
  title: z.string().min(1, "Title should not be emtpy"),
  linkUrl: z.string().min(1, "Title should not be emtpy"),
  file: ImageSchema,
});

type InputType = z.infer<typeof FormSchema>;

export const ChangeBrandCreateBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createBrand, { isError, isSuccess, isLoading }] = useCreateBrandMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  // **
  const onSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    createBrand(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Create new brand</h2>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <FormInput
          id=""
          isPass={false}
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.title?.message}
          register={register}
          name="title"
          type="text"
          placeholder="Title"
        />

        <FormInput
          id=""
          isPass={false}
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.linkUrl?.message}
          register={register}
          name="linkUrl"
          type="text"
          placeholder="Link"
        />

        <FormFileInput
          text="Upload picture"
          error={errors?.file?.message?.toString()}
          name="file"
          accept=".png, .jpg, .jpeg"
          register={register}
          classNameBtn={`${s.btn} ${cs.btn}`}
          classNameWrapper={`${s.btnWrapper} ${cs.inputWrapper}`}
        />

        <FormSubmit
          classNameWrapper={cs.btnWrapper}
          classNameBtn={cs.btn}
          text="Submit"
          requestStatus={requestStatus}
        />
      </form>
    </section>
  );
};
