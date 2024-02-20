"use client";

import React from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useCreateContactUsMessageMutation } from "../../../redux/backendApi";

import { useValidateForm } from "../../../utils/customHooks";
import { checkRequestStatus, toArray } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./contactUsForm.module.scss";

import AngleDown from "../../../../public/img/angle-down.svg";

const selectPlaceholder = "Query Related";

type ContactUsFormProps = {
  queries: ContactUsQueriesType;
};

export const ContactUsForm: React.FC<ContactUsFormProps> = ({ queries: queriesData }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const [createMessage, { isError, isSuccess, isLoading }] = useCreateContactUsMessageMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText, isValidEmail, validateEmail, isValidSelect, validateSelect } =
    useValidateForm();

  const validateForm = () => {
    return [isValidEmail, isValidText[0], isValidText[1], isValidSelect[0]].every((el) =>
      !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success"),
    );
  };

  // **
  const onSubmit = () => {
    const form = formRef.current;
    if (!form || !validateForm()) return;

    const formData = new FormData(form);
    createMessage(formData);
  };

  // **
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
    setActive(option);

    validateSelect(e.currentTarget, idx);
  };

  const onSelectOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    idx: number,
    option: number,
  ) => {
    if (e.key === "Enter") {
      setActive(option);

      validateSelect(e.currentTarget, idx);

      (e.currentTarget.closest('[role="listbox"]') as HTMLDivElement)?.focus();
    }
  };

  // **
  const queries = [selectPlaceholder, ...toArray(queriesData)];

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
        <input
          type="text"
          onChange={(e) => validateText(e.target.value, 0)}
          placeholder="Full Name"
          name="fullname"
          className={cs.input}
        />
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidEmail}>
        <input
          type="text"
          onChange={(e) => validateEmail(e.target.value)}
          placeholder="Your Email"
          name="email"
          className={cs.input}
        />
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidSelect[0]}>
        <div
          className={`${cs.select} ${cs.input}`}
          role="listbox"
          tabIndex={0}
          onKeyDown={(e) => onSelectKeyDown(e, 0)}
          onClick={(e) => onSelectClick(e, 0)}>
          <div className={`${cs.selectHead} ${active === 0 ? "" : cs.selectHeadActive}`}>
            <span className={cs.selectSelected}>{queries[active]}</span>
            <input type="hidden" name="query" value={queries[active]} />

            <AngleDown aria-hidden="true" className={cs.inputSvg} />
          </div>
          <div
            className={`${cs.selectWrapper} ${cs.input} ${isOpen ? cs.selectWrapperActive : ""}`}>
            <OverlayScrollbarsComponent defer element="ul" className={cs.selectList}>
              {queries.map((query, i) => (
                <li
                  key={i}
                  tabIndex={0}
                  className={`${cs.selectItem} ${active === i ? cs.selectItemActive : ""}`}
                  role="option"
                  aria-selected={active === i ? "true" : "false"}
                  onKeyDown={(e) => onSelectOptionKeyDown(e, 0, i)}
                  onClick={(e) => onSelectOptionClick(e, 0, i)}>
                  {query}
                </li>
              ))}
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}>
        <textarea
          onChange={(e) => validateText(e.target.value, 1)}
          className={`${s.textarea} ${cs.input}`}
          placeholder="Message"
          name="message"></textarea>
      </div>

      <div className={cs.btnWrapper} {...requestStatus}>
        <button
          onClick={onSubmit}
          className={`${s.submit} ${cs.btn} ${cs.btnLg}`}
          disabled={!validateForm()}
          type="button">
          Send Message
        </button>
      </div>
    </form>
  );
};
