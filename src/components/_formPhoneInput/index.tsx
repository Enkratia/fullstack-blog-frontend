"use client";

import React from "react";

import { IMaskInput } from "react-imask";

import cs from "../../scss/helpers.module.scss";

type FormPhoneInputProps = {
  error: string | undefined;
  classNameWrapper: string;
  classNameInput: string;
  defaultValue: string;
  name: string;
  placeholder: string;
  mask: string;
  onPhoneValidation: (value: string) => void;
};

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  error = "",
  name,
  classNameWrapper,
  classNameInput,
  placeholder,
  defaultValue,
  mask,
  onPhoneValidation,
}) => {
  const phoneRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={`${classNameWrapper} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <IMaskInput
        ref={phoneRef}
        mask={mask}
        onAccept={(value: string) => onPhoneValidation(value)}
        type="text"
        className={classNameInput}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      <strong className={cs.inputMessage}>{error}</strong>
    </div>
  );
};

/* <FormPhoneInput
  error={errors.contactPhone?.message}
  classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
  classNameInput={`${s.input} ${cs.input}`}
  mask="000 0000 0000"
  name="contactPhone"
  placeholder="Phone"
  defaultValue={info.contact?.phone}
  onPhoneValidation={onPhoneValidation}
/>; */

// const onPhoneValidation = (value: string) => {
//   setValue("contactPhone", value);
// };
