"use client";

import React from "react";

import { useDeleteQueryMutation, useUpdateQueryMutation } from "../../redux/backendApi";

import {
  AlertDeleteQueryPopup,
  AlertUpdateQueryPopup,
  ConfirmDeleteQueryPopup,
} from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./query.module.scss";

import Check from "../../../public/img/default/check.svg";
import Edit from "../../../public/img/default/edit.svg";
import Bin from "../../../public/img/default/bin.svg";

type QueryProps = {
  obj: ContactUsQueryType;
  refetch: () => void;
};

export const Query: React.FC<QueryProps> = ({ obj, refetch }) => {
  const [isShowAlertDelete, setIsShowAlertDelete] = React.useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = React.useState(false);
  const [isShowAlertUpdate, setIsShowAlertUpdate] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const [isEditable, setIsEditable] = React.useState(false);

  const [updateQuery, { isError: isUpdateError, isSuccess: isUpdateSuccess, reset: resetUpdate }] =
    useUpdateQueryMutation();

  const [deleteQuery, { isError: isDeleteError, isSuccess: isDeleteSuccess, reset: resetDelete }] =
    useDeleteQueryMutation();

  // **
  const onEditClick = () => {
    if (isEditable && formRef.current) {
      const formData = new FormData(formRef.current);

      updateQuery({
        id: obj.id,
        body: formData,
      });

      setIsEditable(false);
      return;
    }

    setIsEditable(true);
  };

  // **
  const onDeleteClick = () => {
    setIsShowConfirmDelete(true);
  };

  const onConfirmDelete = (value: boolean) => {
    setIsShowConfirmDelete(false);

    if (value) {
      deleteQuery(obj.id);
    }
  };

  // **
  React.useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }

    if (isDeleteError) {
      setIsShowAlertDelete(true);
    }

    resetDelete();
  }, [isDeleteError, isDeleteSuccess]);

  // **
  React.useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
    }

    if (isUpdateError) {
      setIsShowAlertUpdate(true);
    }

    resetUpdate();
  }, [isUpdateError, isUpdateSuccess]);

  return (
    <form className={s.root} onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <div className={s.btns}>
        <button
          onClick={onEditClick}
          className={`${s.btn} ${s.btnEdit} ${isEditable ? s.btnEditActive : ""}`}
          aria-label="Edit query.">
          {isEditable ? <Check aria-hidden="true" /> : <Edit aria-hidden="true" />}
        </button>

        <button
          onClick={onDeleteClick}
          className={`${s.btn} ${s.btnDelete}`}
          aria-label="Delete query.">
          <Bin aria-hidden="true" />
        </button>
      </div>

      <textarea
        className={`${s.input} ${cs.input}`}
        disabled={!isEditable}
        defaultValue={obj.content}
        name="content"
        placeholder="Query"
      />

      {isShowConfirmDelete && (
        <ConfirmDeleteQueryPopup onConfirmClick={(value) => onConfirmDelete(value)} />
      )}

      {isShowAlertDelete && (
        <AlertDeleteQueryPopup onAlertClick={() => setIsShowAlertDelete(false)} />
      )}

      {isShowAlertUpdate && (
        <AlertUpdateQueryPopup onAlertClick={() => setIsShowAlertUpdate(false)} />
      )}
    </form>
  );
};
