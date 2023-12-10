"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useImmer } from "use-immer";

import cs from "../../../scss/helpers.module.scss";
import s from "./profileForm.module.scss";

type ProfileFormProps = {
  user: UserType;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const router = useRouter();

  const initialFields = {
    fullname: user.fullname,
    email: user.email,
    profession: "",
    company: "",
    representation: "",
  };

  return (
    <form className={s.root}>
      <div className={s.inputs}>
        <div className={`${s.inputWrapper} ${cs.inputWrapper}`}>
          <input type="text" placeholder="Fullname" className={`${s.input} ${cs.input}`} />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} data-validity="email">
          <input type="text" placeholder="Email" className={`${s.input} ${cs.input}`} />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} data-validity="pass">
          <input type="password" placeholder="Password" className={`${s.input} ${cs.input}`} />
        </div>

        <div className={`${s.inputWrapper} ${cs.inputWrapper}`} data-validity="pass-confirm">
          <input
            type="password"
            placeholder="Confirm password"
            className={`${s.input} ${cs.input}`}
          />
        </div>

        <input type="text" placeholder="Profession" className={`${s.input} ${cs.input}`} />
        <input type="text" placeholder="Company" className={`${s.input} ${cs.input}`} />

        <div className={s.uploadWrapper}>
          <button className={`${s.upload} ${cs.btn}`}>Upload picture</button>
          <input type="file" hidden />
        </div>
      </div>

      <div className={s.inputs}>
        <input type="text" placeholder="Facebook link" className={`${s.input} ${cs.input}`} />
        <input type="text" placeholder="Twitter link" className={`${s.input} ${cs.input}`} />
        <input type="text" placeholder="Instagram link" className={`${s.input} ${cs.input}`} />
        <input type="text" placeholder="LinkedIn link" className={`${s.input} ${cs.input}`} />
      </div>

      <textarea placeholder="Representation" className={`${s.textarea} ${cs.input}`}></textarea>

      <button type="button" className={`${s.submit} ${cs.btn}`}>
        Submit
      </button>
    </form>
  );
};
