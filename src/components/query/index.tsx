"use client";

import React from "react";

import { useUpdateQueryMutation } from "../../redux/backendApi";

import cs from "../../scss/helpers.module.scss";
import s from "./query.module.scss";

import Check from "../../../public/img/default/check.svg";
import Edit from "../../../public/img/default/edit.svg";
import Bin from "../../../public/img/default/bin.svg";
import { AlertDeleteQueryPopup, ConfirmDeleteQueryPopup } from "..";

type QueryProps = {
  obj: ContactUsQueryType;
};

export const Query: React.FC<QueryProps> = ({ obj }) => {
  const [isShowAlertDelete, setIsShowAlertDelete] = React.useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const [isEditable, setIsEditable] = React.useState(false);

  const [updateQuery] = useUpdateQueryMutation();

  // **
  const onEditClick = () => {
    if (isEditable && formRef.current) {
      const formData = new FormData(formRef.current);

      updateQuery({
        id: obj.id,
        body: formData,
      });

      setIsShowConfirmDelete(true);

      return;
    }

    setIsEditable(true);
  };

  const onConfirmDelete = (value: boolean) => {
    setIsShowConfirmDelete(false);

    if (value) {
      deleteTestimonial(obj.id);
    }
  };

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <div className={s.btns}>
        <button
          onClick={onEditClick}
          className={`${s.btn} ${s.btnEdit} ${isEditable ? s.btnEditActive : ""}`}
          aria-label="Edit query.">
          {isEditable ? <Check aria-hidden="true" /> : <Edit aria-hidden="true" />}
        </button>

        <button className={`${s.btn} ${s.btnDelete}`} aria-label="Delete query.">
          <Bin aria-hidden="true" />
        </button>
      </div>

      <textarea disabled={!isEditable} className={`${s.input} ${cs.input}`}>
        {obj.content}
      </textarea>

      {isShowConfirmDelete && (
        <ConfirmDeleteQueryPopup onConfirmClick={(value) => onConfirmDelete(value)} />
      )}

      {isShowAlertDelete && (
        <AlertDeleteQueryPopup onAlertClick={() => setIsShowAlertDelete(false)} />
      )}
    </form>
  );
};
