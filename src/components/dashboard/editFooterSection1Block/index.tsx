"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateFooterBottomMutation } from "../../../redux/backendApi";

import { FormInput, FormPhoneInput, FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(13, "Phone number is invalid"),
  address: z.string().min(2, "Field should have atleast 2 characters"),
  facebook: z.string().min(2, "Field should have atleast 2 characters"),
  instagram: z.string().min(2, "Field should have atleast 2 characters"),
  linkedin: z.string().min(2, "Field should have atleast 2 characters"),
  twitter: z.string().min(2, "Field should have atleast 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

type EditFooterSection1BlockProps = {
  data: FooterBottomType;
};

export const EditFooterSection1Block: React.FC<EditFooterSection1BlockProps> = ({ data }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [updateFooterBottom, { isError, isSuccess, isLoading }] = useUpdateFooterBottomMutation();
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
      email: data.email,
      phone: data.phone,
      address: data.address,
      facebook: data.socialLinks.facebook,
      instagram: data.socialLinks.instagram,
      linkedin: data.socialLinks.linkedin,
      twitter: data.socialLinks.twitter,
    },
  });

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    updateFooterBottom(formData);
  };

  const onPhoneValidation = (value: string) => {
    setValue("phone", value);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Footer</h2>

      <form className={s.form} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.email?.message}
            register={register}
            name="email"
            type="text"
            placeholder="Email"
          />

          <FormPhoneInput
            error={errors.phone?.message}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            mask="000 0000 0000"
            name="phone"
            placeholder="Phone"
            defaultValue={data.phone ?? ""}
            onPhoneValidation={onPhoneValidation}
          />

          <FormTextarea
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameTextarea={`${s.input} ${cs.input}`}
            error={errors?.address?.message}
            register={register}
            name="address"
            placeholder="Address"
          />

          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.facebook?.message}
            register={register}
            name="facebook"
            type="text"
            placeholder="Facebook link"
          />

          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.instagram?.message}
            register={register}
            name="instagram"
            type="text"
            placeholder="Instagram link"
          />

          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.linkedin?.message}
            register={register}
            name="linkedin"
            type="text"
            placeholder="Linkedin link"
          />

          <FormInput
            isPass={false}
            classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.twitter?.message}
            register={register}
            name="twitter"
            type="text"
            placeholder="Twitter link"
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
