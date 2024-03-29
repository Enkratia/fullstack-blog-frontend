import React from "react";

import { UseFormRegister } from "react-hook-form";

import cs from "../../scss/helpers.module.scss";

type FormFileInputProps = {
  text: string;
  accept: string;
  error: string | undefined;
  name: string;
  register: UseFormRegister<any>;
  classNameWrapper: string;
  classNameBtn: string;
};

export const FormFileInput: React.FC<FormFileInputProps> = ({
  error = "",
  text,
  name,
  accept,
  classNameWrapper,
  classNameBtn,
  register,
}) => {
  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <div className={`${classNameWrapper} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <button onClick={onUploadClick} type="button" className={classNameBtn}>
        {text}
      </button>

      <input {...register(name)} type="file" accept={accept} hidden />

      <strong className={cs.inputMessage}>{error}</strong>
    </div>
  );
};

// const imageSchema = z
//   .any()
//   // To not allow empty files
//   .refine((files) => files?.length >= 1, { message: "Picture is required." })
//   // To not allow files other than images
//   .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
//     message: ".jpg, .jpeg, .png and .webp files are accepted.",
//   })
//   // To not allow files larger than 5MB
//   .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
//     message: `Max file size is 2MB.`,
//   })
//   .optional();
