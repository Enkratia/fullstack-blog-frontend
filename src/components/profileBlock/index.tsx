import React from "react";

import cs from "../../scss/helpers.module.scss";
import s from "./profileBlock.module.scss";

export const ProfileBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Profile</h2>

      <div className={s.fields}>
        <div className={s.inputs}>
          <div className={`${s.inputWrapper} ${cs.inputWrapper}`}>
            <input type="text" placeholder="Fullname" className={`${s.input} ${cs.input}`} />
          </div>

          <input type="text" placeholder="Profession" className={`${s.input} ${cs.input}`} />
          <input type="text" placeholder="Company" className={`${s.input} ${cs.input}`} />

          <div className={s.uploadWrapper}>
            <button className={`${s.upload} ${cs.btn}`}>Upload photo</button>
            <input type="file" hidden />
          </div>
        </div>

        <textarea placeholder="Representation" className={`${s.textarea} ${cs.input}`}></textarea>

        <div className={s.inputs}>
          <input type="text" placeholder="Facebook link" className={`${s.input} ${cs.input}`} />
          <input type="text" placeholder="Twitter link" className={`${s.input} ${cs.input}`} />
          <input type="text" placeholder="Instagram link" className={`${s.input} ${cs.input}`} />
          <input type="text" placeholder="LinkedIn link" className={`${s.input} ${cs.input}`} />
        </div>
      </div>
    </section>
  );
};
