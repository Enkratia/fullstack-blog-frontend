"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateAboutUsStaticMutation } from "../../../../redux/backendApi";

import { FormSubmit, FormTextarea } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../editSection.module.scss";

const FormSchema = z.object({
  headerTitle: z.string().min(2, "Title should be atleast 2 characters"),
  headerDescription: z.string().min(2, "Description should be atleast 2 characters"),
  missionTitle: z.string().min(2, "Title should be atleast 2 characters"),
  missionDescription: z.string().min(2, "Description should be atleast 2 characters"),
  visionTitle: z.string().min(2, "Title should be atleast 2 characters"),
  visionDescription: z.string().min(2, "Description should be atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditAboutUsSection1FormProps = {
  info: AboutUsStaticType;
};

export const EditAboutUsSection1Form: React.FC<EditAboutUsSection1FormProps> = ({ info }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateAboutUsStatic, { isError, isSuccess, isLoading }] = useUpdateAboutUsStaticMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      headerTitle: info.header.title,
      headerDescription: info.header.description,
      missionTitle: info.mission.title,
      missionDescription: info.mission.description,
      visionTitle: info.vision.title,
      visionDescription: info.vision.description,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateAboutUsStatic(formData);
  };

  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Section 1</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`}>
            <button onClick={onUploadClick} type="button" className={cs.btn}>
              Upload picture
            </button>

            <input type="file" accept=".png, .jpg, .jpeg, .svg" name="file" hidden />
          </div>

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.headerTitle?.message}
            register={register}
            name="headerTitle"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.headerDescription?.message}
            register={register}
            name="headerDescription"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.missionTitle?.message}
            register={register}
            name="missionTitle"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.missionDescription?.message}
            register={register}
            name="missionDescription"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.visionTitle?.message}
            register={register}
            name="visionTitle"
            placeholder=""
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.visionDescription?.message}
            register={register}
            name="visionDescription"
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
