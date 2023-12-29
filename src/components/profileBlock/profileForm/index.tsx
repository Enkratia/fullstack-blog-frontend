"use client";

import React from "react";

import { useLazyUpdateUserQuery } from "../../../redux/backendApi";

import { checkRequestStatus } from "../../../utils/customFunctions";
import { useValidateForm } from "../../../utils/customHooks";

import cs from "../../../scss/helpers.module.scss";
import s from "./profileForm.module.scss";

type ProfileFieldsType = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  company: string;
  profession: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  representation: string;
};

type ProfileFormProps = {
  user: UserType;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const setInitialsFields = (): ProfileFieldsType => {
    return {
      fullname: user.fullname,
      email: user.email,
      password: "",
      passwordConfirm: "",
      company: user.company,
      profession: user.profession,
      facebook: user.userLinks?.facebook,
      twitter: user.userLinks?.twitter,
      instagram: user.userLinks?.instagram,
      linkedin: user.userLinks?.linkedin,
      representation: user.representation,
    };
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  const [isMount, setIsMount] = React.useState(true);
  const [fields] = React.useState(setInitialsFields());

  const [updateUser, { isError, isSuccess, isFetching, isLoading }] = useLazyUpdateUserQuery();
  const requestStatus = checkRequestStatus(isError, isSuccess, isFetching, isLoading);

  const {
    isValidText,
    validateText,
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,
    isValidPassConfirm,
    validatePassConfirm,
  } = useValidateForm();

  // **
  const validateForm = () => {
    return [isValidText[0], isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
      !el ? !el : !Object.keys(el)[0].includes("data-validity-warning"),
    );
  };

  // **
  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();

    setIsMount(false);
  };

  // **
  const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm() || !formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.delete("passwordConfirm");
    formData.get("password") === "" && formData.delete("password");

    updateUser({
      id: user.id,
      body: formData,
    });
  };

  // **
  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    validateText(e.target.value, idx);
    setIsMount(false);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
    setIsMount(false);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validatePassLength(e.target.value, { resetWhenEmpty: true });
    setIsMount(false);
  };

  const onPaswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validatePassConfirm(e.target.value, { resetWhenEmpty: true });
    setIsMount(false);
  };

  // **
  const onInputChange = () => {
    setIsMount(false);
  };

  // console.log(isMount, validateForm());

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef} name="profile">
      <div className={s.inputs}>
        <div className={`${cs.inputWrapper}`} {...isValidText[0]}>
          <input
            onChange={(e) => onFullnameChange(e, 0)}
            type="text"
            placeholder="Fullname"
            name="fullname"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.fullname}
          />
        </div>

        <div className={`${cs.inputWrapper}`} {...isValidEmail}>
          <input
            onChange={onEmailChange}
            type="text"
            placeholder="Email"
            name="email"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.email}
          />
        </div>

        <div className={`${cs.inputWrapper}`} {...isValidPassLength}>
          <input
            onChange={onPasswordChange}
            type="password"
            placeholder="Password"
            name="password"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.password}
          />
        </div>

        <div className={`${cs.inputWrapper}`} {...isValidPassConfirm}>
          <input
            onChange={onPaswordConfirmChange}
            type="password"
            placeholder="Confirm password"
            name="passwordConfirm"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.passwordConfirm}
          />
        </div>

        <input
          onChange={onInputChange}
          type="text"
          placeholder="Profession"
          name="profession"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.profession}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Company"
          name="company"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.company}
        />

        <div className={s.uploadWrapper}>
          <button onClick={onUploadClick} type="button" className={`${s.upload} ${cs.btn}`}>
            Upload picture
          </button>
          <input type="file" accept=".png, .jpg, .jpeg, .svg" name="file" hidden />
        </div>
      </div>

      <div className={s.inputs}>
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Facebook link"
          name="facebook"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.facebook}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Twitter link"
          name="twitter"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.twitter}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Instagram link"
          name="instagram"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.instagram}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="LinkedIn link"
          name="linkedin"
          className={`${s.input} ${cs.input}`}
          defaultValue={fields.linkedin}
        />
      </div>

      <textarea
        onChange={onInputChange}
        placeholder="Representation"
        name="representation"
        className={`${s.textarea} ${cs.input}`}>
        {fields.representation}
      </textarea>

      <div className={`${cs.btnWrapper} ${cs[requestStatus]}`}>
        <button
          onClick={onSubmitClick}
          type="button"
          className={`${s.submit} ${`${cs.btn} ${
            !isMount && validateForm() ? "" : cs.btnDisabled
          }`}`}>
          Submit
        </button>
      </div>
    </form>
  );
};
