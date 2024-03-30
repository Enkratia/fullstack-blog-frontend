"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateTestimonialStaticMutation } from "../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

const FormSchema = z.object({
  title: z.string().min(2, "Title should be atleast 2 characters"),
  subtitle: z.string().min(2, "Subtitle should be atleast 2 characters"),
  description: z.string().min(2, "Description should be atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditHomeSection8BlockProps = {
  data: TestimonialStaticType;
};

export const EditHomeSection8Block: React.FC<EditHomeSection8BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateTestimonialStatic, { isError, isSuccess, isLoading }] =
    useUpdateTestimonialStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateTestimonialStatic(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 8</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.title?.message}
            register={register}
            name="title"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.subtitle?.message}
            register={register}
            name="subtitle"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.description?.message}
            register={register}
            name="description"
            placeholder=""
            rows={3}
          />

          <FormSubmit
            classNameWrapper={cs.btnWrapper}
            classNameBtn={cs.btn}
            text="Submit"
            requestStatus={requestStatus}
          />
        </div>
      </form>
    </section>
  );
};
