"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateBrandMutation } from "../../../../../redux/backendApi";

import { FormInput, FormSubmit } from "../../../../../components";
import { checkRequestStatus } from "../../../../../utils/customFunctions";

import cs from "../../../../../scss/helpers.module.scss";
import s from "../changeBrandEditBlock.module.scss";

const FormSchema = z.object({
  title: z.string().min(2, "Field should have atleast 2 characters"),
  linkUrl: z.string().min(2, "Field should have atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type ChangeBrandEditBlockProps = {
  data: FeaturedCompanyType;
};

export const ChangeBrandEditForm: React.FC<ChangeBrandEditBlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateBrand, { isError, isSuccess, isLoading }] = useUpdateBrandMutation();
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
      linkUrl: data.linkUrl,
    },
  });

  // **
  const onSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    updateBrand({
      id: data.id,
      body: formData,
    });
  };

  // **

  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
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

      <div className={`${s.btnWrapper} ${cs.inputWrapper}`}>
        <button onClick={onUploadClick} type="button" className={`${s.btn} ${cs.btn}`}>
          Upload picture
        </button>

        <input type="file" accept=".png" name="file" hidden />
      </div>

      <FormSubmit
        classNameWrapper={`${cs.btnWrapper} ${cs.btnWrapper}`}
        classNameBtn={`${s.btn} ${cs.btn}`}
        text="Submit"
        requestStatus={requestStatus}
      />
    </form>
  );
};
