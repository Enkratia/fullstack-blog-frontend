"use client";

import React from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useValidateForm } from "../../../utils/customHooks";

import cs from "../../../scss/helpers.module.scss";
import s from "./ContactUsForm.module.scss";

import AngleDown from "../../../../public/img/angle-down.svg";

const data: ContactUsQueryType = [
  "Query1",
  "Query2",
  "Query3",
  "Query4",
  "Query5",
  "Query6",
  "Query7",
  "Query8",
  "Query9",
  "Query10",
  "Query11",
];

const selectPlaceholder = "Query Related";

export const ContactUsForm: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const { isValidText, validateText, isValidEmail, validateEmail, isValidSelect, validateSelect } =
    useValidateForm();

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
  const queries = [selectPlaceholder, ...data];

  return (
    <form className={s.root}>
      <div className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidText[0]]}`}>
        <input
          type="text"
          onChange={(e) => validateText(e.target.value, 0)}
          placeholder="Full Name"
          name="contact-us-fullname"
          className={cs.input}
        />
      </div>

      <div
        className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidEmail]}`}
        data-validity="email">
        <input
          type="text"
          onChange={(e) => validateEmail(e.target.value)}
          placeholder="Your Email"
          name="contact-us-email"
          className={cs.input}
        />
      </div>

      <div className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidSelect[0]]}`}>
        <div
          className={`${cs.select} ${cs.input}`}
          role="listbox"
          tabIndex={0}
          onKeyDown={(e) => onSelectKeyDown(e, 0)}
          onClick={(e) => onSelectClick(e, 0)}>
          <div className={`${cs.selectHead} ${active === 0 ? "" : cs.selectHeadActive}`}>
            <span className={cs.selectSelected}>{queries[active]}</span>
            <input type="hidden" name="contact-us-input-hidden" value={queries[active]} />

            <AngleDown aria-hidden="true" />
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

      <div className={`${s.inputWrapper} ${cs.inputWrapper} ${cs[isValidText[1]]}`}>
        <textarea
          onChange={(e) => validateText(e.target.value, 1)}
          className={`${s.textarea} ${cs.input}`}
          placeholder="Message"
          name="contact-us-message"></textarea>
      </div>

      <button type="submit" className={`${s.submit} ${cs.btn}`}>
        Send Message
      </button>
    </form>
  );
};
