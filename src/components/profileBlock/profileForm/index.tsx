"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useImmer } from "use-immer";

import { useGetUserByIdQuery } from "../../../redux/backendApi";
import { useValidateForm } from "../../../utils/customHooks";

import cs from "../../../scss/helpers.module.scss";
import s from "./profileForm.module.scss";

interface IObjectKeys {
  [key: string]: string;
}

interface IinitialFields extends IObjectKeys {
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
  const setInitialsFields = (): IinitialFields => {
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

  const [fields, setFields] = useImmer(setInitialsFields());

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

  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setFields((o) => {
      o.fullname = e.target.value;
      return o;
    });

    validateText(e.target.value, idx);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.email = e.target.value;
      return o;
    });

    validateEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.password = e.target.value;
      return o;
    });

    validatePassLength(e.target.value);
  };

  const onPaswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((o) => {
      o.passwordConfirm = e.target.value;
      return o;
    });

    validatePassConfirm(e.target.value);
  };

  // **
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((o) => {
      o[e.target.name] = e.target.value;
      return o;
    });
  };

  return (
    <form className={s.root}>
      <div className={s.inputs}>
        <div className={`${cs.inputWrapper} ${cs[isValidText[0]]}`}>
          <input
            onChange={(e) => onFullnameChange(e, 0)}
            type="text"
            placeholder="Fullname"
            name="fullname"
            className={`${s.input} ${cs.input}`}
            value={fields.fullname}
          />
        </div>

        <div className={`${cs.inputWrapper} ${cs[isValidEmail]}`} data-validity="email">
          <input
            onChange={onEmailChange}
            type="text"
            placeholder="Email"
            name="email"
            className={`${s.input} ${cs.input}`}
            value={fields.email}
          />
        </div>

        <div className={`${cs.inputWrapper} ${cs[isValidPassLength]}`} data-validity="pass">
          <input
            onChange={onPasswordChange}
            type="password"
            placeholder="Password"
            name="password"
            className={`${s.input} ${cs.input}`}
            value={fields.password}
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
            value={fields.passwordConfirm}
          />
        </div>

        <input
          onChange={onInputChange}
          type="text"
          placeholder="Profession"
          name="profession"
          className={`${s.input} ${cs.input}`}
          value={fields.profession}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Company"
          name="company"
          className={`${s.input} ${cs.input}`}
          value={fields.company}
        />

        <div className={s.uploadWrapper}>
          <button className={`${s.upload} ${cs.btn}`}>Upload picture</button>
          <input type="file" hidden />
        </div>
      </div>

      <div className={s.inputs}>
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Facebook link"
          name="facebook"
          className={`${s.input} ${cs.input}`}
          value={fields.facebook}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Twitter link"
          name="twitter"
          className={`${s.input} ${cs.input}`}
          value={fields.twitter}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Instagram link"
          name="instagram"
          className={`${s.input} ${cs.input}`}
          value={fields.instagram}
        />
        <input
          onChange={onInputChange}
          type="text"
          placeholder="LinkedIn link"
          name="linkedin"
          className={`${s.input} ${cs.input}`}
          value={fields.linkedin}
        />
      </div>

      <textarea
        onChange={onInputChange}
        placeholder="Representation"
        name="representation"
        className={`${s.textarea} ${cs.input}`}>
        {fields.representation}
      </textarea>

      <button type="button" className={`${s.submit} ${cs.btn}`}>
        Submit
      </button>
    </form>
  );
};
