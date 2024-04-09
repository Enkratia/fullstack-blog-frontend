"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateUsMissionStaticMutation } from "../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

const FormSchema = z.object({
  aboutTitle: z.string().min(2, "Title should be atleast 2 characters"),
  aboutDescription: z.string().min(2, "Description should be atleast 2 characters"),
  missionTitle: z.string().min(2, "Title should be atleast 2 characters"),
  missionDescription: z.string().min(2, "Description should be atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditHomeSection3BlockProps = {
  data: UsMissionType;
};

export const EditHomeSection3Block: React.FC<EditHomeSection3BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateUsMission, { isError, isSuccess, isLoading }] = useUpdateUsMissionStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      aboutTitle: data.about.title,
      aboutDescription: data.about.description,
      missionTitle: data.mission.title,
      missionDescription: data.mission.description,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateUsMission(formData);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 3</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.aboutTitle?.message}
            register={register}
            name="aboutTitle"
            placeholder="Title"
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.aboutDescription?.message}
            register={register}
            name="aboutDescription"
            placeholder="Description"
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.missionTitle?.message}
            register={register}
            name="missionTitle"
            placeholder="Title"
            rows={3}
          />

          <FormTextarea
            id=""
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.missionDescription?.message}
            register={register}
            name="missionDescription"
            placeholder="Description"
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
