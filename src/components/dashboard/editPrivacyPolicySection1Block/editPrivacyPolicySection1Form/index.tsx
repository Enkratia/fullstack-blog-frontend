"use client";

import React from "react";
import { useImmer } from "use-immer";
import { JSONContent } from "@tiptap/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdatePrivacyPolicyMutation } from "../../../../redux/backendApi";

import { FormSubmit, TextEditor } from "../../../../components";
import { checkRequestStatus } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "../../editSection.module.scss";

const FormSchema = z.object({
  text: z.string().min(1, "Policy should have atleast 1 character"),
});

type InputType = z.infer<typeof FormSchema>;

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

  // **
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: data.message,
    },
  });

  // **
  const onSubmit = () => {
    const formData = new FormData();
    formData.delete("text");
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

    setValue("text", text);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Privacy Policy</h2>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.content}>
          <TextEditor
            setContent={(text: string, json: JSONContent) => onEditorChange({ text, json })}
            defaultContent={JSON.parse(data.message)}
            register={register}
            error={errors.text?.message}
            name="text"
            textContent={content.text}
          />

          <FormSubmit
            classNameWrapper={cs.btnWrapper}
            classNameBtn={cs.btn}
            text="Submit"
            requestStatus={requestStatus}
          />
        </div>
      </form>
    </section>
  );
};
