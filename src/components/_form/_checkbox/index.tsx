import React from "react";

import cs from "../../../scss/helpers.module.scss";
import Check from "../../../../public/img/default/check.svg";

type CheckboxProps = {
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
  name: string;
  id: string;
  className: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onCheckboxChange,
  name,
  id,
  className,
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
      ref={checkboxRef}
      onClick={onCheckboxClick}
      onKeyDown={onCheckboxDown}
      className={`${className} ${cs.checkbox} ${isChecked ? cs.checkboxChecked : ""}`}
      tabIndex={0}
      role="checkbox"
      aria-checked={isChecked ? "true" : "false"}>
      <Check aria-hidden="true" />

      <input name={name} type="checkbox" id={id} checked={isChecked} readOnly hidden />
    </div>
  );
};

/* <Checkbox isChecked={} onCheckboxChange={} name="" id="" className="" />; */
