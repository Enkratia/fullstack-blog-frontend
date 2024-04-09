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
  id: string;
  classNameInput: string;
  sorting: SortingType;
  activeOption: number;
  onSelectChange: (option: number) => void;
};

export const Select: React.FC<SelectProps> = ({
  id,
  classNameInput,
  sorting,
  activeOption,
  onSelectChange,
}) => {
  const selectListRef = React.useRef<HTMLUListElement>(null);
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

    if ("id" in e.target && e.target.id !== "" && e.target.id === id) {
      select.focus();
    }
  };

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    const select = e.currentTarget;

    const getPrevLiIdx = () => {
      const prevFocusedLi = selectListRef.current?.querySelector("li:focus");
      const allLi = selectListRef.current?.querySelectorAll("li") || [];
      let liIdx = Array.from(allLi).findIndex((el) => el === prevFocusedLi);

      if (!selectListRef.current?.contains(e.target as HTMLElement)) {
        liIdx = activeOption;
      }

      return liIdx;
    };

    // **
    if (e.key === "Enter") {
      setIsOpen((b) => !b);
    } else if (e.key === " ") {
      e.preventDefault();
      setIsOpen((b) => !b);
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();

      const liIdx = getPrevLiIdx();

      const nextOption = liIdx > 0 ? liIdx - 1 : liIdx;
      selectListRef.current?.querySelectorAll("li")?.[nextOption]?.focus();
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();

      const liIdx = getPrevLiIdx();

      const nextOption = liIdx < sorting.length - 1 ? liIdx + 1 : liIdx;
      selectListRef.current?.querySelectorAll("li")?.[nextOption]?.focus();
    } else if ((e.key === "PageUp" || e.key === "Home") && isOpen) {
      e.preventDefault();

      selectListRef.current?.querySelectorAll("li")?.[0]?.focus();
    } else if ((e.key === "PageDown" || e.key === "End") && isOpen) {
      e.preventDefault();

      selectListRef.current?.querySelectorAll("li")?.[sorting.length - 1]?.focus();
    }

    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);

    if ("id" in e.target && e.target.id !== "" && e.target.id === id) {
      select.focus();
    }
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

  const onSelectBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${classNameInput} ${cs.select}`}
      role="listbox"
      tabIndex={0}
      onKeyDown={(e) => onSelectKeyDown(e, 0)}
      onBlur={onSelectBlur}
      onClick={(e) => onSelectClick(e, 0)}>
      <div className={`${cs.selectHead} ${activeOption === 0 ? "" : cs.selectHeadActive}`}>
        <span className={cs.selectSelected}>{sorting[activeOption].title}</span>

        <input
          type="text"
          name="option"
          value={sorting[activeOption].title}
          id={id}
          hidden
          readOnly
        />

        <Chevron
          aria-hidden="true"
          className={isOpen ? cs.inputSelectSvg : cs.inputSelectSvgActive}
        />
      </div>
      <div
        className={`${classNameInput} ${cs.selectWrapper} ${isOpen ? cs.selectWrapperActive : ""}`}>
        <ul className={cs.selectList} ref={selectListRef}>
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
  id=""
  classNameInput={cs.input}
  sorting={sorting}
  activeOption={activeOption}
  onSelectChange={onSelectChange}
/> */
