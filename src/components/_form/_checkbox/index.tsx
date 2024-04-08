import React from "react";

import cs from "../../../scss/helpers.module.scss";
import Check from "../../../../public/img/default/check.svg";

type CheckboxProps = {
  initialValue: boolean;
  name: string;
  id: string;
  className: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({ initialValue, name, id, className }) => {
  const [isChecked, setIsChecked] = React.useState(initialValue);

  return (
    <div
      onClick={() => setIsChecked((b) => !b)}
      className={`${className} ${cs.checkbox} ${isChecked ? cs.checkboxChecked : ""}`}
      tabIndex={0}
      role="checkbox"
      aria-checked={isChecked ? "true" : "false"}>
      <Check aria-hidden="true" />

      <input type="hidden" name={name} defaultValue={initialValue ? "1" : "0"} />

      <input
        type="checkbox"
        id={id}
        name={name}
        defaultValue={initialValue ? "1" : "0"}
        checked={isChecked}
        readOnly
        hidden
      />
    </div>
  );
};
