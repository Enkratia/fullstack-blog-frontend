import React from "react";

import cs from "../../../scss/helpers.module.scss";
import Chevron from "../../../../public/img/default/chevron.svg";

type SortingProperties = {
  readonly title: string;
  readonly code: string;
};

type SortingType = readonly SortingProperties[];

// **
type SelectProps = {
  classNameInput: string;
  sorting: SortingType;
  activeOption: number;
  onSelectChange: (option: number) => void;
};

export const Select: React.FC<SelectProps> = ({
  classNameInput,
  sorting,
  activeOption,
  onSelectChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onSelectClick = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
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

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
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

  const onSelectOptionClick = (e: React.MouseEvent<HTMLLIElement>, idx: number, option: number) => {
    onSelectChange(option);
  };

  const onSelectOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    idx: number,
    option: number,
  ) => {
    if (e.key === "Enter") {
      onSelectChange(option);

      (e.currentTarget.closest('[role="listbox"]') as HTMLDivElement)?.focus();
    }
  };

  return (
    <div
      className={`${classNameInput} ${cs.select}`}
      role="listbox"
      tabIndex={0}
      onKeyDown={(e) => onSelectKeyDown(e, 0)}
      onClick={(e) => onSelectClick(e, 0)}>
      <div className={`${cs.selectHead} ${activeOption === 0 ? "" : cs.selectHeadActive}`}>
        <span className={cs.selectSelected}>{sorting[activeOption].title}</span>
        <input type="hidden" name="option" value={sorting[activeOption].title} />

        <Chevron
          aria-hidden="true"
          className={isOpen ? cs.inputSelectSvg : cs.inputSelectSvgActive}
        />
      </div>
      <div
        className={`${classNameInput} ${cs.selectWrapper} ${isOpen ? cs.selectWrapperActive : ""}`}>
        <ul className={cs.selectList}>
          {sorting.map(({ title }, i) => (
            <li
              key={i}
              tabIndex={0}
              className={`${cs.selectItem} ${activeOption === i ? cs.selectItemActive : ""}`}
              role="option"
              aria-selected={activeOption === i ? "true" : "false"}
              onKeyDown={(e) => onSelectOptionKeyDown(e, 0, i)}
              onClick={(e) => onSelectOptionClick(e, 0, i)}>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* <Select
  classNameInput={cs.input}
  sorting={sorting}
  activeOption={activeOption}
  onSelectChange={onSelectChange}
/> */
