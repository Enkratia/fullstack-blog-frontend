"use client";

import React from "react";
import { useImmer } from "use-immer";
import { JSONContent } from "@tiptap/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdatePostMutation } from "../../../redux/backendApi";

import { FormFileInput, FormInput, FormSelect, FormSubmit, TextEditor } from "../../../components";
import { capitalize, checkRequestStatus, toArray } from "../../../utils/customFunctions";
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_IMAGE_NAMES } from "../../../utils/constants";

import cs from "../../../scss/helpers.module.scss";
import s from "../../../components/addPost/addPostForm/addPostForm.module.scss";

const ImageSchema = z
  .any()
  // not required
  .refine(
    (f) => (!f?.length ? !f?.length : ACCEPTED_IMAGE_TYPES.split(", ").includes(f?.[0]?.type)),
    {
      message: `${ACCEPTED_IMAGE_NAMES} files are accepted`,
    },
  )
  .optional();

const TagsSchema = z
  .string()
  .refine((value) => value.replace(/(\s|,)/g, "").length >= 1, {
    message: "Tags should contain atleast 1 tag",
  })
  .optional();

const FormSchema = z.object({
  title: z.string().min(1, "Field should have atleast 1 character"),
  category: z.string().min(1, "Field should have atleast 1 character"),
  contentText: z.string().min(10, "Field should have atleast 10 characters"),
  tags: TagsSchema,
  file: ImageSchema,
});

type InputType = z.infer<typeof FormSchema>;

const categoriesPlaceholder = "choose category";
const categoriesNames: CategoryNames = ["startup", "business", "economy", "technology"];
const categories = [categoriesPlaceholder, ...categoriesNames];

type ContentType = { text: string; json: JSONContent };

type EditPostFormProps = {
  post: PostType;
};

export const EditPostForm: React.FC<EditPostFormProps> = ({ post }) => {
  const getCategoryIdx = () => {
    return categories.findIndex((category) => {
      return category === post.category.toLowerCase();
    });
  };

  const [updatePost, { isError, isLoading, isSuccess }] = useUpdatePostMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  const [content, setContent] = useImmer<ContentType>({
    text: post.contentText,
    json: JSON.parse(post.contentJson),
  });

  const [activeOption, setActiveOption] = React.useState(getCategoryIdx());

  // **
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, submitCount },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post.title,
      category: post.category,
      contentText: post.contentText,
      tags: toArray(post.tags).join(", "),
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  // **
  const onSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.append("contentJson", JSON.stringify(content.json));

    updatePost({ id: post.id, body: formData });
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

  const onContentValidation = (text: string) => {
    setValue("contentText", text, {
      shouldValidate: !!submitCount,
    });
  };

  const onSelectValidation = (option: number, options: string[]) => {
    setValue("category", option ? options[option].toLowerCase() : "", {
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
        classNameWrapper={`${s.inputWrapper} ${cs.inputWrapper}`}
        classNameInput={cs.input}
        error={errors?.category?.message}
        name="category"
        placeholder={capitalize(categoriesPlaceholder)}
        onSelectValidation={onSelectValidation}
        options={categoriesNames.map((el) => capitalize(el))}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        register={register}
      />

      <FormFileInput
        text="Upload picture"
        error={errors?.file?.message?.toString()}
        name="file"
        accept={ACCEPTED_IMAGE_NAMES}
        register={register}
        classNameBtn={`${s.upload} ${cs.btn}`}
        classNameWrapper={`${s.uploadWrapper} ${cs.inputWrapper}`}
      />

      <TextEditor
        setContent={(text: string, json: JSONContent) => onEditorChange({ text, json })}
        defaultContent={JSON.parse(post.contentJson)}
        register={register}
        error={errors.contentText?.message}
        name="contentText"
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
