"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateCategoryHeaderMutation } from "../../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../editSection.module.scss";

const FormSchema = z.object({
  startup: z.string().min(2, "Field should have atleast 2 characters"),
  economy: z.string().min(2, "Field should have atleast 2 characters"),
  business: z.string().min(2, "Field should have atleast 2 characters"),
  technology: z.string().min(2, "Field should have atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditCategorySection1FormProps = {
  data: CategoryHeaderType;
};

export const EditCategorySection1Form: React.FC<EditCategorySection1FormProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  // **
  const [updateCategoryHeader, { isError, isSuccess, isLoading }] =
    useUpdateCategoryHeaderMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startup: data.startup,
      economy: data.economy,
      business: data.business,
      technology: data.technology,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateCategoryHeader(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Category</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.startup?.message}
            register={register}
            name="startup"
            placeholder=""
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.economy?.message}
            register={register}
            name="economy"
            placeholder=""
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.business?.message}
            register={register}
            name="business"
            placeholder=""
          />

          <FormTextarea
            id=""
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
