"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateJoinMutation } from "../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

const FormSchema = z.object({
  title: z.string().min(2, "Title should be atleast 2 characters"),
  description: z.string().min(2, "Description should be atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditHomeSection9BlockProps = {
  data: JoinType;
};

export const EditHomeSection9Block: React.FC<EditHomeSection9BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateJoin, { isError, isSuccess, isLoading }] = useUpdateJoinMutation();
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
      description: data.description,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateJoin(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 9</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.title?.message}
            register={register}
            name="title"
            placeholder=""
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.description?.message}
            register={register}
            name="description"
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
