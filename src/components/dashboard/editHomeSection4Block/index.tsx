"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateCategoryDescriptionStaticMutation } from "../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

const FormSchema = z.object({
  business: z.string().min(2, "Business should be atleast 2 characters"),
  startup: z.string().min(2, "Startup should be atleast 2 characters"),
  economy: z.string().min(2, "Economy should be atleast 2 characters"),
  technology: z.string().min(2, "Technology should be atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditHomeSection4BlockProps = {
  data: CategoryDescriptionType;
};

export const EditHomeSection4Block: React.FC<EditHomeSection4BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateCategoryDescription, { isError, isSuccess, isLoading }] =
    useUpdateCategoryDescriptionStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      business: data.business,
      startup: data.startup,
      economy: data.economy,
      technology: data.technology,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateCategoryDescription(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 4</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.business?.message}
            register={register}
            name="business"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.startup?.message}
            register={register}
            name="startup"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.economy?.message}
            register={register}
            name="economy"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.technology?.message}
            register={register}
            name="technology"
            placeholder=""
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
