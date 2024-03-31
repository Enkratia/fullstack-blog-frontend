"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateContactUsMutation } from "../../../../redux/backendApi";

import { FormPhoneInput, FormSubmit, FormTextarea } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../editSection.module.scss";

const FormSchema = z.object({
  contactEmail: z.string().email("Please enter a valid email"),
  contactPhone: z.string().min(13, "Phone number is invalid"),
  headerTitle: z.string().min(2, "Field should have atleast 2 characters"),
  headerSubtitle: z.string().min(2, "Field should have atleast 2 characters"),
  headerDescription: z.string().min(2, "Field should have atleast 2 characters"),
  timeDays: z.string().min(2, "Field should have atleast 2 characters"),
  timeHours: z.string().min(2, "Field should have atleast 2 characters"),
  timeDescription: z.string().min(2, "Field should have atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditContactUsSection1Form = {
  info: ContactUsType;
};

export const EditContactUsSection1Form: React.FC<EditContactUsSection1Form> = ({ info }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateContactUs, { isError, isSuccess, isLoading }] = useUpdateContactUsMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contactEmail: info.contact?.email,
      contactPhone: info.contact?.phone,
      headerTitle: info.header?.title,
      headerSubtitle: info.header?.subtitle,
      headerDescription: info.header?.description,
      timeDays: info.time?.days,
      timeHours: info.time?.hours,
      timeDescription: info.time?.description,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateContactUs(formData);
  };

  const onPhoneValidation = (value: string) => {
    setValue("contactPhone", value);
  };

  return (
    <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.content}>
        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.contactEmail?.message}
          register={register}
          name="contactEmail"
          placeholder="Email"
        />

        <FormPhoneInput
          error={errors.contactPhone?.message}
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameInput={`${s.input} ${cs.input}`}
          mask="000 0000 0000"
          name="contactPhone"
          placeholder="Phone"
          defaultValue={info.contact?.phone}
          onPhoneValidation={onPhoneValidation}
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.headerTitle?.message}
          register={register}
          name="headerTitle"
          placeholder="Title"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.headerSubtitle?.message}
          register={register}
          name="headerSubtitle"
          placeholder="Subtitle"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.headerDescription?.message}
          register={register}
          name="headerDescription"
          placeholder="Description"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.timeDays?.message}
          register={register}
          name="timeDays"
          placeholder="Days"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.timeHours?.message}
          register={register}
          name="timeHours"
          placeholder="Hours"
        />

        <FormTextarea
          classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
          classNameTextarea={`${s.input} ${cs.input}`}
          error={errors?.timeDescription?.message}
          register={register}
          name="timeDescription"
          placeholder="Description"
        />

        <FormSubmit
          classNameWrapper={cs.btnWrapper}
          classNameBtn={cs.btn}
          text="Submit"
          requestStatus={requestStatus}
        />
      </div>
    </form>
  );
};
