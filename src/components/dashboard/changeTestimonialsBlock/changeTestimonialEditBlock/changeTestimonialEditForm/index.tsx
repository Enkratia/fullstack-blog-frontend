"use client";

import React from "react";
import { useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateTestimonialMutation } from "../../../../../redux/backendApi";

import { FormFileInput, FormInput, FormSubmit, FormTextarea } from "../../../../../components";
import { checkRequestStatus } from "../../../../../utils/customFunctions";
import { ACCEPTED_IMAGE_NAMES, ACCEPTED_IMAGE_TYPES } from "../../../../../utils/constants";

import cs from "../../../../../scss/helpers.module.scss";
import s from "../changeTestimonialEditBlock.module.scss";

const ImageSchema = z
  .any()
  .refine((f) => (!f?.length ? true : ACCEPTED_IMAGE_TYPES.split(", ").includes(f?.[0]?.type)), {
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

type ChangeTestimonialEditFormProps = {
  testimonial: TestimonialType;
};

export const ChangeTestimonialEditForm: React.FC<ChangeTestimonialEditFormProps> = ({
  testimonial,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateTestimonial, { isError, isSuccess, isLoading }] = useUpdateTestimonialMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: testimonial.fullname,
      address: testimonial.address,
      text: testimonial.text,
    },
  });

  // **
  const onSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    updateTestimonial({
      id: testimonial.id,
      body: formData,
    });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <FormInput
        id=""
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
        id=""
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
        id=""
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
  );
};
