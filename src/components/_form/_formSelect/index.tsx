import React from "react";

import { UseFormRegister } from "react-hook-form";

import cs from "../../../scss/helpers.module.scss";
import Chevron from "../../../../public/img/default/chevron.svg";

type FormSelectProps = {
  maxVisible?: number;
  error: string | undefined;
  register: UseFormRegister<any>;
  name: string;
  id: string;
  placeholder: string;
  classNameWrapper: string;
  classNameInput: string;
  options: string[];
  activeOption: number;
  setActiveOption: React.Dispatch<React.SetStateAction<number>>;
  onSelectValidation: (option: number, options: string[]) => void;
};

export const FormSelect: React.FC<FormSelectProps> = ({
  error,
  register,
  name,
  id,
  placeholder,
  classNameWrapper,
  classNameInput,
  options,
  activeOption,
  setActiveOption,
  onSelectValidation,
  maxVisible = 5,
}) => {
  const listRef = React.useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const finalOptions = [placeholder, ...options];

  React.useEffect(() => {
    if (!listRef.current) return;
    const visibleLiCount = maxVisible > finalOptions.length ? finalOptions.length : maxVisible;

    const listPaddingTop = getComputedStyle(listRef.current).paddingTop;
    const listFirstLi = listRef.current.firstElementChild;

    const selectListLiHeight = (listFirstLi && getComputedStyle(listFirstLi).height) || "0";

    const height = parseFloat(listPaddingTop) * 2 + parseFloat(selectListLiHeight) * visibleLiCount;
    listRef.current.style.height = height + "px";
  });

  // **
  const onSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const select = e.currentTarget;
    setIsOpen((b) => !b);

    // **
    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);

    // **
    if ("id" in e.target && e.target.id !== "" && e.target.id === id) {
      select.focus();
    }
  };

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const select = e.currentTarget;

    const getPrevLiIdx = () => {
      const prevFocusedLi = listRef.current?.querySelector("li:focus");
      const allLi = listRef.current?.querySelectorAll("li") || [];
      let liIdx = Array.from(allLi).findIndex((el) => el === prevFocusedLi);

      if (!listRef.current?.contains(e.target as HTMLElement)) {
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
      listRef.current?.querySelectorAll("li")?.[nextOption]?.focus();
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();

      const liIdx = getPrevLiIdx();

      const nextOption = liIdx < finalOptions.length - 1 ? liIdx + 1 : liIdx;
      listRef.current?.querySelectorAll("li")?.[nextOption]?.focus();
    } else if ((e.key === "PageUp" || e.key === "Home") && isOpen) {
      e.preventDefault();

      listRef.current?.querySelectorAll("li")?.[0]?.focus();
    } else if ((e.key === "PageDown" || e.key === "End") && isOpen) {
      e.preventDefault();

      listRef.current?.querySelectorAll("li")?.[finalOptions.length - 1]?.focus();
    }

    // **
    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);

    // **
    if ("id" in e.target && e.target.id !== "" && e.target.id === id) {
      select.focus();
    }
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

  const onSelectBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${classNameWrapper} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <div
        className={`${cs.select} ${classNameInput}`}
        role="listbox"
        tabIndex={0}
        onKeyDown={onSelectKeyDown}
        onBlur={onSelectBlur}
        onClick={onSelectClick}>
        <div className={`${cs.selectHead} ${activeOption === 0 ? "" : cs.selectHeadActive}`}>
          <span className={cs.selectSelected}>{finalOptions[activeOption]}</span>

          <input
            {...register(name)}
            type="text"
            id={id}
            value={activeOption === 0 ? "" : finalOptions[activeOption]}
            hidden
          />

          <Chevron
            aria-hidden="true"
            className={isOpen ? cs.inputSelectSvg : cs.inputSelectSvgActive}
          />
        </div>
        <div className={`${cs.selectWrapper} ${isOpen ? cs.selectWrapperActive : ""}`}>
          <ul className={cs.selectList} ref={listRef}>
            {finalOptions.map((option, i) => (
              <li
                key={i}
                tabIndex={0}
                className={`${classNameInput} ${cs.selectItem} ${
                  activeOption === i ? cs.selectItemActive : ""
                }`}
                role="option"
                aria-selected={activeOption === i ? "true" : "false"}
                onKeyDown={(e) => onSelectOptionKeyDown(e, i)}
                onClick={(e) => onSelectOptionClick(e, i)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <strong className={cs.inputMessage}>{error ?? ""}</strong>
    </div>
  );
};

/* <FormSelect
  id=""
  classNameWrapper={s.inputWrapper}
  classNameInput={cs.input}
  error={errors?.query?.message}
  name="query"
  placeholder={placeholder}
  onSelectValidation={onSelectValidation}
  options={toArray(queriesData)}
  activeOption={activeOption}
  setActiveOption={setActiveOption}
  register={register}
/>; */

// const onSelectValidation = (option: number, options: string[]) => {
//   setValue("category", option ? options[option] : "", {
//     shouldValidate: !!submitCount,
//   });
// };

// **
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import "overlayscrollbars/overlayscrollbars.css";
/* <OverlayScrollbarsComponent defer element="ul" className={cs.selectList}> */
/* </OverlayScrollbarsComponent> */
