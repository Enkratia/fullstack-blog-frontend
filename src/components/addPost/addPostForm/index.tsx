"use client";

import React from "react";
import { useImmer } from "use-immer";
import { JSONContent } from "@tiptap/react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useCreatePostMutation } from "../../../redux/backendApi";

import { AddPostEditor } from "../../../components";
import { useValidateForm } from "../../../utils/customHooks";
import { capitalize, checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./addPostForm.module.scss";
import AngleDown from "../../../../public/img/angle-down.svg";

const categoriesPlaceholder = "choose category";
const categoriesNames: CategoriesNames = ["startup", "business", "economy", "technology"];
const categories = [categoriesPlaceholder, ...categoriesNames];

type ContentType = { text: string; json: JSONContent };

export const AddPostForm: React.FC = () => {
  const [createPost, { isError, isLoading, isSuccess }] = useCreatePostMutation();

  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const [content, setContent] = useImmer<ContentType>({ text: "", json: {} });

  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const formRef = React.useRef<HTMLFormElement>(null);
  const { isValidText, validateText, isValidSelect, validateSelect, isValidFile, validateFile } =
    useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText[0], isValidText[1], isValidText[2], isValidSelect[0], isValidFile].every(
      (el) => (!el ? !!el : Object.keys(el)[0].includes("data-validity-success")),
    );
  };

  // **
  const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm() || !formRef?.current) return;

    const formData = new FormData(formRef.current);
    formData.append("contentJson", JSON.stringify(content.json));
    formData.append("contentText", content.text);

    createPost(formData);
  };

  // **
  const onEditorChange = ({ text, json }: ContentType) => {
    setContent((o) => {
      o.json = json;
      o.text = text;
      return o;
    });

    validateText(text, 1);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateFile(e.target.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    validateText(e.target.value, idx);
  };

  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
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

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[0]}>
        <input
          onChange={(e) => onInputChange(e, 0)}
          type="text"
          className={`${s.input} ${cs.input}`}
          placeholder="Title"
          name="title"
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
            <span className={cs.selectSelected}>{capitalize(categories[active])}</span>
            <input type="hidden" name="category" value={categories[active]} />

            <AngleDown aria-hidden="true" className={cs.inputSvg} />
          </div>
          <div
            className={`${cs.selectWrapper} ${cs.input} ${isOpen ? cs.selectWrapperActive : ""}`}>
            <OverlayScrollbarsComponent defer element="ul" className={cs.selectList}>
              {categories.map((category, i) => (
                <li
                  key={i}
                  tabIndex={0}
                  className={`${cs.selectItem} ${active === i ? cs.selectItemActive : ""}`}
                  role="option"
                  aria-selected={active === i ? "true" : "false"}
                  onKeyDown={(e) => onSelectOptionKeyDown(e, 0, i)}
                  onClick={(e) => onSelectOptionClick(e, 0, i)}>
                  {capitalize(category)}
                </li>
              ))}
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>

      <div className={`${s.uploadWrapper} ${cs.inputWrapper}`} {...isValidFile}>
        <button onClick={onUploadClick} type="button" className={`${s.upload} ${cs.btn}`}>
          Upload picture
        </button>

        <input
          onChange={onFileChange}
          type="file"
          accept=".png, .jpg, .jpeg, .svg"
          name="file"
          hidden
        />
      </div>

      <AddPostEditor
        isValidText={isValidText[1]}
        setContent={(text: string, json: JSONContent) => onEditorChange({ text, json })}
      />

      <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[2]}>
        <input
          onChange={(e) => onInputChange(e, 2)}
          type="text"
          className={`${s.input} ${cs.input}`}
          placeholder="Tags"
          name="tags"
        />
      </div>

      <div className={`${cs.btnWrapper} ${cs[requestStatus]}`}>
        <button
          onClick={onSubmitClick}
          className={`${s.submit} ${cs.btn}`}
          disabled={!validateForm()}
          type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
