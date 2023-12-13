"use client";

import React from "react";
import { useImmer } from "use-immer";

import { useLazyUpdateUserQuery } from "../../../redux/backendApi";
import { useValidateForm } from "../../../utils/customHooks";

import cs from "../../../scss/helpers.module.scss";
import s from "./profileForm.module.scss";

interface IProfileFields {
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
}

type ProfileFormProps = {
  user: UserType;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const setInitialsFields = (): IProfileFields => {
    return {
      fullname: user.fullname,
      email: user.email,
      password: "",
      passwordConfirm: "",
      company: user.company,
      profession: user.profession,
      facebook: user.userLinks.facebook,
      twitter: user.userLinks.twitter,
      instagram: user.userLinks.instagram,
      linkedin: user.userLinks.linkedin,
      representation: user.representation,
    };
  };

  const formRef = React.useRef<HTMLFormElement>(null);
  const [isMount, setIsMount] = React.useState(true);
  const [fields, setFields] = useImmer(setInitialsFields());

  const [updateUser] = useLazyUpdateUserQuery();

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
  const isValidForm = () => {
    return [isValidText[0], isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
      !el ? !el : !el.includes("inputWrapperWarning"),
    );
  };

  // **
  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  // **
  const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = e.currentTarget?.nextElementSibling as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  // **
  const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidForm() || !formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.delete("passwordConfirm");
    formData.get("password") === "" && formData.delete("password");

    formData.delete("image"); // TEMP

    // const body: Partial<UserType> = {
    //   fullname: fields.fullname,
    //   email: fields.email,
    //   company: fields.company,
    //   profession: fields.profession,
    //   representation: fields.representation,
    //   userLinks: {
    //     facebook: fields.facebook,
    //     twitter: fields.twitter,
    //     instagram: fields.instagram,
    //     linkedin: fields.linkedin,
    //   },
    // };

    // if (fields.password !== "") {
    //   body.password = fields.password;
    // }

    updateUser({
      id: user.id,
      body: formData,
    });
  };

  // **
  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setFields((o) => {
      o.fullname = e.target.value;
      return o;
    });

    validateText(e.target.value, idx);
    setIsMount(false);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFields((o) => {
    //   o.email = e.target.value;
    //   return o;
    // });

    validateEmail(e.target.value);
    setIsMount(false);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFields((o) => {
    //   o.password = e.target.value;
    //   return o;
    // });

    validatePassLength(e.target.value, { resetWhenEmpty: true });
    setIsMount(false);
  };

  const onPaswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFields((o) => {
    //   o.passwordConfirm = e.target.value;
    //   return o;
    // });

    validatePassConfirm(e.target.value, { resetWhenEmpty: true });
    setIsMount(false);
  };

  // **
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // setFields((o) => {
    //   o[e.target.name] = e.target.value;
    //   return o;
    // });

    setIsMount(false);
  };

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef} name="profile">
      <div className={s.inputs}>
        <div className={`${cs.inputWrapper} ${cs[isValidText[0]]}`}>
          <input
            onChange={(e) => onFullnameChange(e, 0)}
            type="text"
            placeholder="Fullname"
            name="fullname"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.fullname}
          />
        </div>

        <div className={`${cs.inputWrapper} ${cs[isValidEmail]}`} data-validity="email">
          <input
            onChange={onEmailChange}
            type="text"
            placeholder="Email"
            name="email"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.email}
          />
        </div>

        <div className={`${cs.inputWrapper} ${cs[isValidPassLength]}`} data-validity="pass-length">
          <input
            onChange={onPasswordChange}
            type="password"
            placeholder="Password"
            name="password"
            className={`${s.input} ${cs.input}`}
            defaultValue={fields.password}
          />
        </div>

        <div
          className={`${cs.inputWrapper} ${cs[isValidPassConfirm]}`}
          data-validity="pass-confirm">
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
          <input
            onChange={onUploadChange}
            type="file"
            accept=".png, .jpg, .jpeg, .webp, .avif, .gif"
            name="file"
            hidden
          />
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

      <button
        onClick={onSubmitClick}
        type="button"
        className={`${s.submit} ${`${cs.btn} ${!isMount && isValidForm() ? "" : cs.btnDisabled}`}`}>
        Submit
      </button>
    </form>
  );
};
