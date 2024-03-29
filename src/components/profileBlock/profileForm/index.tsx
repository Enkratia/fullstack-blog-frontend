"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateUserMutation } from "../../../redux/backendApi";

import { FormInput, FormSubmit } from "../../../components";
import { checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./profileForm.module.scss";

const FormSchema = z
  .object({
    fullname: z
      .string()
      .min(2, "Fullname should be atleast 2 characters")
      .max(45, "Fullname must be less than 45 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .regex(new RegExp(/^.{0}$|^.{6,46}$/), "Password should be 6-45 characters"),
    confirmPassword: z
      .string()
      .regex(new RegExp(/^.{0}$|^.{6,46}$/), "Password should be 6-45 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

type ProfileFieldsType = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  company: string;
  profession: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  representation: string;
};

type ProfileFormProps = {
  user: UserType;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { data: session, update: updateSession } = useSession();

  const setInitialsFields = (): ProfileFieldsType => {
    return {
      fullname: user.fullname,
      email: user.email,
      password: "",
      passwordConfirm: "",
      company: user.company,
      profession: user.profession,
      facebook: user.userLinks?.facebook,
      twitter: user.userLinks?.twitter,
      instagram: user.userLinks?.instagram,
      linkedin: user.userLinks?.linkedin,
      representation: user.representation,
    };
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  const [fields] = React.useState(setInitialsFields());

  const [updateUser, { isError, isSuccess, isLoading }] = useUpdateUserMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  // **
  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  // **
  const onSubmit = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.delete("confirmPassword");
    formData.get("password") === "" && formData.delete("password");

    const res = await updateUser({
      id: user.id,
      body: formData,
    });

    if ("data" in res) {
      updateSession({ newUser: res.data });
    }
  };

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className={s.inputs}>
        <FormInput
          isPass={false}
          classNameWrapper={cs.inputWrapper}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.fullname?.message}
          register={register}
          name="fullname"
          type="text"
          placeholder="Full Name"
        />

        <FormInput
          isPass={false}
          classNameWrapper={cs.inputWrapper}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.email?.message}
          register={register}
          name="email"
          type="text"
          placeholder="Email"
        />

        <FormInput
          isPass={true}
          classNameWrapper={cs.inputWrapper}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.password?.message}
          register={register}
          name="password"
          type="password"
          placeholder="Password"
        />

        <FormInput
          isPass={true}
          classNameWrapper={cs.inputWrapper}
          classNameInput={`${s.input} ${cs.input}`}
          error={errors?.confirmPassword?.message}
          register={register}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />

        <input
          type="text"
          placeholder="Profession"
          name="profession"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.profession}
        />

        <input
          type="text"
          placeholder="Company"
          name="company"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.company}
        />

        <div className={s.uploadWrapper}>
          <button onClick={onUploadClick} type="button" className={`${s.upload} ${cs.btn}`}>
            Upload picture
          </button>

          <input type="file" accept=".png, .jpg, .jpeg, .svg" name="file" hidden />
        </div>
      </div>

      <div className={s.inputs}>
        <input
          type="text"
          placeholder="Facebook link"
          name="facebook"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.facebook}
        />
        <input
          type="text"
          placeholder="Twitter link"
          name="twitter"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.twitter}
        />
        <input
          type="text"
          placeholder="Instagram link"
          name="instagram"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.instagram}
        />
        <input
          type="text"
          placeholder="LinkedIn link"
          name="linkedin"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.linkedin}
        />
      </div>

      <textarea
        spellCheck={false}
        placeholder="Representation"
        name="representation"
        className={`${s.textarea} ${cs.input}`}
        defaultValue={fields.representation}
      />

      <FormSubmit
        classNameWrapper={cs.btnWrapper}
        classNameBtn={`${s.submit} ${cs.btn}`}
        text="Submit"
        requestStatus={requestStatus}
      />
    </form>
  );
};
