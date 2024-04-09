"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateQueryMutation } from "../../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeQueriesCreateBlock.module.scss";

const FormSchema = z.object({
  content: z.string().min(1, "Field should have atleast 1 character"),
});

type InputType = z.infer<typeof FormSchema>;

export const ChangeQueriesCreateBlock: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createQuery, { isError, isSuccess, isLoading }] = useCreateQueryMutation();
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
    createQuery(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Create query</h2>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <FormTextarea
          id=""
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.content?.message}
          register={register}
          name="content"
          placeholder="Query"
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
