"use client";

import React from "react";
import { useImmer } from "use-immer";
import { JSONContent } from "@tiptap/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreatePostMutation } from "../../../redux/backendApi";

import { FormFileInput, FormInput, FormSelect, FormSubmit, TextEditor } from "../../../components";
import { capitalize, checkRequestStatus } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./addPostForm.module.scss";

const ImageSchema = z
  .any()
  .refine((files) => files?.length >= 1, { message: "Picture is required." })
  .optional();

const TagsSchema = z
  .string()
  .refine((value) => value.replace(/(\s|,)/g, "").length >= 1, {
    message: "Tags should contain atleast 1 tag",
  })
  .optional();

const FormSchema = z.object({
  title: z.string().min(1, "Fullname should be atleast 1 character"),
  category: z.string().min(1, "Please choose a category"),
  contentText: z.string().min(10, "Post should be atleast 10 characters"),
  file: ImageSchema,
  tags: TagsSchema,
});

type InputType = z.infer<typeof FormSchema>;

type ContentType = { text: string; json: JSONContent };

const categoriesPlaceholder = "choose category";
const categoriesNames: CategoryNames = ["startup", "business", "economy", "technology"];

export const AddPostForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [createPost, { isError, isLoading, isSuccess }] = useCreatePostMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const [activeOption, setActiveOption] = React.useState(0);
  const [content, setContent] = useImmer<ContentType>({ text: "", json: {} });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, submitCount },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  // **
  const onSubmit = () => {
    if (!formRef?.current) return;

    const formData = new FormData(formRef.current);
    formData.append("contentJson", JSON.stringify(content.json));

    createPost(formData);
  };

  // **
  const onEditorChange = ({ text, json }: ContentType) => {
    setContent((o) => {
      o.json = json;
      o.text = text;
      return o;
    });

    onContentValidation(text);
  };

  // **
  const onSelectValidation = (option: number, options: string[]) => {
    setValue("category", option ? options[option] : "", {
      shouldValidate: !!submitCount,
    });
  };

  const onContentValidation = (text: string) => {
    setValue("contentText", text, {
      shouldValidate: !!submitCount,
    });
  };

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <FormInput
        id=""
        isPass={false}
        classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
        classNameInput={`${s.input} ${cs.input}`}
        error={errors?.title?.message}
        register={register}
        name="title"
        type="text"
        placeholder="Title"
      />

      <FormSelect
        id=""
        classNameWrapper={s.inputWrapper}
        classNameInput={cs.input}
        error={errors?.category?.message}
        name="category"
        placeholder={capitalize(categoriesPlaceholder)}
        onSelectValidation={onSelectValidation}
        options={categoriesNames}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        register={register}
      />

      <FormFileInput
        text="Upload picture"
        error={errors?.file?.message?.toString()}
        name="file"
        accept=".png, .jpg, .jpeg"
        register={register}
        classNameBtn={`${s.upload} ${cs.btn}`}
        classNameWrapper={`${s.uploadWrapper} ${cs.inputWrapper}`}
      />

      <TextEditor
        name="contentText"
        register={register}
        error={errors.contentText?.message}
        setContent={(text: string, json: JSONContent) => onEditorChange({ text, json })}
        textContent={content.text}
      />

      <FormInput
        id=""
        isPass={false}
        classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
        classNameInput={`${s.input} ${cs.input}`}
        error={errors?.tags?.message}
        register={register}
        name="tags"
        type="text"
        placeholder="Tags"
      />

      <FormSubmit
        classNameWrapper={cs.btnWrapper}
        classNameBtn={`${s.submit} ${cs.btn}`}
        text="Submit"
        requestStatus={requestStatus}
      />
    </form>
  );
};
