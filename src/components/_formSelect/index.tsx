import React from "react";

import { UseFormRegister } from "react-hook-form";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import cs from "../../scss/helpers.module.scss";
import AngleDown from "../../../public/img/angle-down.svg";

type FormSelect = {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  className?: string;
  options: string[];
  activeOption: number;
  setActiveOption: React.Dispatch<React.SetStateAction<number>>;
  onSelectValidation: (option: number, options: string[]) => void;
};

export const FormSelect: React.FC<FormSelect> = ({
  register,
  name,
  placeholder,
  className,
  options,
  activeOption,
  setActiveOption,
  onSelectValidation,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const finalOptions = [placeholder, ...options];

  const onSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const select = e.currentTarget;
    setIsOpen((b) => !b);

    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);
  };

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const select = e.currentTarget;

    if (e.key === "Enter") {
      setIsOpen((b) => !b);
    }

    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);
  };

  const onSelectOptionClick = (e: React.MouseEvent<HTMLLIElement>, option: number) => {
    setActiveOption(option);

    onSelectValidation(option, finalOptions);
  };

  const onSelectOptionKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, option: number) => {
    if (e.key === "Enter") {
      setActiveOption(option);

      onSelectValidation(option, finalOptions);

      (e.currentTarget.closest('[role="listbox"]') as HTMLDivElement)?.focus();
    }
  };

  return (
    <div
      className={`${className ? className : ""} ${cs.select} ${cs.input}`}
      role="listbox"
      tabIndex={0}
      onKeyDown={onSelectKeyDown}
      onClick={onSelectClick}>
      <div className={`${cs.selectHead} ${activeOption === 0 ? "" : cs.selectHeadActive}`}>
        <span className={cs.selectSelected}>{finalOptions[activeOption]}</span>

        <input
          {...register(name)}
          type="hidden"
          name={name}
          value={activeOption === 0 ? "" : finalOptions[activeOption]}
        />

        <AngleDown aria-hidden="true" />
      </div>
      <div className={`${cs.selectWrapper} ${cs.input} ${isOpen ? cs.selectWrapperActive : ""}`}>
        <OverlayScrollbarsComponent defer element="ul" className={cs.selectList}>
          {finalOptions.map((option, i) => (
            <li
              key={i}
              tabIndex={0}
              className={`${cs.selectItem} ${activeOption === i ? cs.selectItemActive : ""}`}
              role="option"
              aria-selected={activeOption === i ? "true" : "false"}
              onKeyDown={(e) => onSelectOptionKeyDown(e, i)}
              onClick={(e) => onSelectOptionClick(e, i)}>
              {option}
            </li>
          ))}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
