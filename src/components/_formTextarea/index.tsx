import React from "react";

import { UseFormRegister } from "react-hook-form";

import cs from "../../scss/helpers.module.scss";

type FormTextareaProps = {
  register: UseFormRegister<any>;
  classNameWrapper: string;
  classNameTextarea: string;
  error: string | undefined;
  name: string;
  placeholder: string;
  rows?: number;
};

export const FormTextarea: React.FC<FormTextareaProps> = ({
  classNameWrapper,
  classNameTextarea,
  error = "",
  register,
  name,
  placeholder,
  rows = 2,
}) => {
  return (
    <div className={`${classNameWrapper} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={classNameTextarea}
        spellCheck={false}
        rows={rows}
      />

      <strong className={cs.inputMessage}>{error}</strong>
    </div>
  );
};

/* <FormTextarea
  classNameWrapper={s.inputWrapper}
  classNameTextarea={`${s.textarea} ${cs.input}`}
  error={errors?.message?.message}
  register={register}
  name="message"
  placeholder="Message"
  rows={rows}
/>; */
