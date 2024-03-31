"use client";

import React from "react";
import Link from "next/link";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateUserMutation } from "../../redux/backendApi";

import { FormInput, FormSubmit, SignupBlockSuccess } from "../../components";
import { useAuthErrorMessage } from "../../utils/customHooks";

import cs from "../../scss/helpers.module.scss";
import s from "../signinBlock/signinBlock.module.scss";
import Close from "../../../public/img/close.svg";

const FormSchema = z
  .object({
    fullname: z
      .string()
      .min(2, "Fullname should be atleast 2 characters")
      .max(45, "Fullname must be less than 45 characters"),
    // .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string(),
    // .min(6, "Password should be atleast 6 characters")
    // .max(45, "Password must be less than 45 characters"),
    confirmPassword: z.string(),
    // .min(6, "Password should be atleast 6 characters")
    // .max(45, "Password must be less than 45 characters"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords doesn't match",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords doesn't match",
      path: ["password"],
    },
  );

// .refine(
//   (data) => {
//     console.log(data);
//     return data.password === data.confirmPassword;
//   },
//   {
//     message: "Passwords doesn't match",
//     // path: ["password"],
//   },
// );

// import * as yup from "yup";

// const validationSchema: Yup.object({
//   password: Yup.string().required('Password is required'),
//   passwordConfirmation: Yup.string()
//      .oneOf([Yup.ref('password'), null], 'Passwords must match')
// });

// export const basicSchema = yup.object().shape({
//   fullname: yup
//     .string()
//     .min(2, "Fullname should be atleast 2 characters")
//     .max(45, "Fullname must be less than 45 characters")
//     .required("Required"),
//   email: yup.string().email("Please enter a valid email").required("Required"),
//   password: yup.string().required("Required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Passwords must match")
//     .required("Required"),
// });

type InputType = z.infer<typeof FormSchema>;

type SignupBlockProps = {
  callbackUrl: string;
  onModalCloseClick?: () => void;
};

export const SignupBlock: React.FC<SignupBlockProps> = ({ callbackUrl, onModalCloseClick }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const callback = `?callbackUrl=${callbackUrl}`;

  const [createUser, { isSuccess }] = useCreateUserMutation();
  const { authMessage, setAuthError } = useAuthErrorMessage();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  // **
  const onCloseClick = () => {
    if (onModalCloseClick) {
      onModalCloseClick();
    }
  };

  const onSubmit = async () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.delete("confirmPassword");

    const res = await createUser(formData);

    if ("error" in res) {
      if ("status" in res.error) {
        if (res.error.status === 409) {
          setAuthError("EmailRegistered");
          return;
        }
      }

      setAuthError("FetchError");
      return;
    }
  };

  console.log(errors.password?.message);
  console.log(errors.confirmPassword?.message);

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <p className={`${s.title} ${cs.title}`}>Sign-up</p>

      {isSuccess ? (
        <SignupBlockSuccess email={getValues().email} />
      ) : (
        <div className={s.content}>
          <FormInput
            isPass={false}
            classNameWrapper={s.inputWrapper}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.fullname?.message}
            register={register}
            name="fullname"
            type="text"
            placeholder="Full Name"
          />

          <FormInput
            isPass={false}
            classNameWrapper={s.inputWrapper}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.email?.message}
            register={register}
            name="email"
            type="text"
            placeholder="Email"
          />

          <FormInput
            isPass={true}
            classNameWrapper={s.inputWrapper}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.password?.message}
            register={register}
            name="password"
            type="password"
            placeholder="Password"
          />

          <FormInput
            isPass={true}
            classNameWrapper={s.inputWrapper}
            classNameInput={`${s.input} ${cs.input}`}
            error={errors?.confirmPassword?.message}
            register={register}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          <FormSubmit
            classNameWrapper={`${s.btnWrapper} ${cs.btnWrapper}`}
            classNameBtn={`${s.btn} ${cs.btn} ${cs.btnLg}`}
            text="Submit"
            requestStatus={authMessage}
          />

          <div className={s.descr}>
            <div className={s.descrWrapper}>
              <span className={s.descrText}>Already have an account?</span>
              <Link href={`/auth/signin${callback}`} className={s.descrLink} scroll={false}>
                Sign-in
              </Link>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onCloseClick}
        className={s.close}
        aria-label="Close the modal window."
        type="button">
        <Close aria-hidden={true} />
      </button>
    </form>
  );
};
