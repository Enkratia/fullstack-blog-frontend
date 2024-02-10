"use client";

import React from "react";
import { useImmer } from "use-immer";
import { JSONContent } from "@tiptap/react";

import { useUpdatePrivacyPolicyMutation } from "../../../../redux/backendApi";

import { TextEditor } from "../../../../components";
import { useValidateForm } from "../../../../utils/customHooks";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../editSection.module.scss";

type ContentType = { text: string; json: JSONContent };

type EditPrivacyPolicySection1FormProps = {
  data: PrivacyPolicyType;
};

export const EditPrivacyPolicySection1Form: React.FC<EditPrivacyPolicySection1FormProps> = ({
  data,
}) => {
  const [content, setContent] = useImmer<ContentType>({
    text: "",
    json: JSON.parse(data.message),
  });

  const [updatePrivacyPolicy, { isError, isSuccess, isLoading }] = useUpdatePrivacyPolicyMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const { isValidText, validateText } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText]
      .flat()
      .every((el) => (!el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning")));
  };

  // **
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.set("message", JSON.stringify(content.json));

    updatePrivacyPolicy(formData);
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

  if (!data) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Privacy Policy</h2>

      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <div className={s.content}>
          <TextEditor
            isValidText={isValidText[0]}
            setContent={(text: string, json: JSONContent) => onEditorChange({ text, json })}
            defaultContent={JSON.parse(data.message)}
          />

          <div className={cs.btnWrapper} {...requestStatus}>
            <button onClick={onSubmit} type="button" className={cs.btn} disabled={!validateForm()}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
