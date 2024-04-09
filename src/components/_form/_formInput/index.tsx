import React from "react";

import { UseFormRegister } from "react-hook-form";

import { ShowPassBtn } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

type FormInputProps = {
  id: string;
  isPass: boolean;
  register: UseFormRegister<any>;
  classNameWrapper: string;
  classNameInput: string;
  error: string | undefined;
  name: string;
  type: string;
  placeholder: string;
};

export const FormInput: React.FC<FormInputProps> = ({
  id,
  isPass,
  classNameWrapper,
  classNameInput,
  error = "",
  register,
  name,
  type,
  placeholder,
}) => {
  const [isShowPass, setIsShowPass] = React.useState(false);

  return (
    <div className={`${classNameWrapper} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <div className={cs.inputWrapperInner}>
        <input
          {...register(name)}
          type={isPass ? (isShowPass ? "text" : "password") : type}
          placeholder={placeholder}
          className={classNameInput}
          id={id}
        />

        {isPass && (
          <ShowPassBtn setIsShowPass={() => setIsShowPass((b) => !b)} isShowPass={isShowPass} />
        )}
      </div>

      <strong className={cs.inputMessage}>{error}</strong>
    </div>
  );
};

// const password = watch("password");
// React.useEffect(() => {
//   if (!submitCount) return;
//   trigger("confirmPassword");
// }, [password, trigger, submitCount]);

/* <FormInput
  id=""
  isPass={false}
  classNameWrapper={s.inputWrapper}
  classNameInput={cs.input}
  error={errors?.fullname?.message}
  register={register}
  name="fullname"
  type="text"
  placeholder="Full Name"
/>; */

// const TagsSchema = z
//   .string()
//   .refine((value) => value.replace(/(\s|,)/g, "").length >= 1, {
//     message: "Tags should contain atleast 1 tag",
//   })
//   .optional();
