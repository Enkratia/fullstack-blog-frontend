"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateTestimonialMutation } from "../../../../redux/backendApi";

import { FormFileInput, FormInput, FormSubmit, FormTextarea } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";
import { ACCEPTED_IMAGE_NAMES, ACCEPTED_IMAGE_TYPES } from "../../../../utils/constants";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeTestimonialCreateBlock.module.scss";

const ImageSchema = z
  .any()
  .refine((files) => files?.length >= 1, { message: "Picture is required" })
  .refine((f) => ACCEPTED_IMAGE_TYPES.split(", ").includes(f?.[0]?.type), {
    message: `${ACCEPTED_IMAGE_NAMES} files are accepted`,
  })
  .optional();

const FormSchema = z.object({
  fullname: z.string().min(2, "Field should have atleast 2 characters"),
  address: z.string().min(2, "Field should have atleast 2 characters"),
  text: z.string().min(2, "Field should have atleast 2 characters"),
  file: ImageSchema,
});

type InputType = z.infer<typeof FormSchema>;

export const ChangeTestimonialCreateBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createTestimonial, { isError, isSuccess, isLoading }] = useCreateTestimonialMutation();
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
    createTestimonial(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Create new Testimonial</h2>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <FormInput
          isPass={false}
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.fullname?.message}
          register={register}
          name="fullname"
          type="text"
          placeholder="Fullname"
        />

        <FormInput
          isPass={false}
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.address?.message}
          register={register}
          name="address"
          type="text"
          placeholder="Address"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.text?.message}
          register={register}
          name="text"
          placeholder="Text"
          rows={5}
        />

        <FormFileInput
          text="Upload picture"
          error={errors?.file?.message?.toString()}
          name="file"
          accept={ACCEPTED_IMAGE_TYPES}
          register={register}
          classNameBtn={`${s.btn} ${cs.btn}`}
          classNameWrapper={`${s.btnWrapper} ${cs.inputWrapper}`}
        />

        <FormSubmit
          classNameWrapper={`${cs.btnWrapper} ${cs.btnWrapper}`}
          classNameBtn={`${s.btn} ${cs.btn}`}
          text="Submit"
          requestStatus={requestStatus}
        />
      </form>
    </section>
  );
};
