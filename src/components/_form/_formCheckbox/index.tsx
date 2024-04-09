import React from "react";
import { UseFormRegister } from "react-hook-form";

import cs from "../../../scss/helpers.module.scss";
import Check from "../../../../public/img/default/check.svg";

type FormCheckboxProps = {
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
  register: UseFormRegister<any>;
  error: string | undefined;
  children?: React.ReactNode;
  name: string;
  id: string;
  className: string;
  classNameWrapper: string;
  classNameLabel: string;
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  isChecked,
  onCheckboxChange,
  register,
  error = "",
  children,
  name,
  id,
  className,
  classNameWrapper,
  classNameLabel,
}) => {
  const checkboxRef = React.useRef<HTMLDivElement>(null);

  const onCheckboxClick = () => {
    onCheckboxChange(isChecked);
    checkboxRef.current?.focus();
  };

  const onCheckboxDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onCheckboxChange(isChecked);
      checkboxRef.current?.focus();
    }
  };

  return (
    <div
      className={`${classNameWrapper} ${error ? cs.checkboxWrapperActive : cs.checkboxWrapper} `}>
      <div className={cs.checkboxWrapperInner}>
        <div
          ref={checkboxRef}
          onClick={onCheckboxClick}
          onKeyDown={onCheckboxDown}
          className={`${className} ${cs.checkbox} ${isChecked ? cs.checkboxChecked : ""}`}
          tabIndex={0}
          role="checkbox"
          aria-checked={isChecked ? "true" : "false"}>
          <Check aria-hidden="true" />

          <input {...register(name)} type="checkbox" id={id} checked={isChecked} readOnly hidden />
        </div>

        <label htmlFor={id} className={`${classNameLabel} ${cs.checkboxLabel}`}>
          {children && children}
        </label>
      </div>

      <strong className={cs.checkboxMessage}>{error}</strong>
    </div>
  );
};

// const onCheckboxChange = (isChecked: boolean) => {
//   setIsChecked(!isChecked);
//   setValue("consent", !isChecked, { shouldValidate: !!submitCount });
// };

/* <FormCheckbox
  id=""
  isChecked={isChecked}
  onCheckboxChange={onCheckboxChange}
  register={register}
  error={errors.consent?.message}
  name="consent"
  id="signup-consent"
  className={s.checkbox}
  classNameWrapper={s.checkboxWrapper}
  classNameLabel={s.checkboxLabel}>
  <span className={s.checkBoxText}>I have read the</span>{" "}
  <a className={s.checkboxLink} href="/privacy-policy" target="_blank">
    privacy policy.
  </a>
</FormCheckbox> */

// consent: z.literal<boolean>(true, { errorMap: () => ({ message: "Please accept all terms" }) }),
