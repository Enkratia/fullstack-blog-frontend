"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useDeleteTestimonialMutation } from "../../redux/backendApi";

import { AlertDeleteTestimonialPopup, ConfirmDeleteTestimonialPopup } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./testimonial.module.scss";
import Deafult from "../../../public/img/default/user.png";
import Bin from "../../../public/img/default/bin.svg";
import Edit from "../../../public/img/default/edit.svg";

type TextButtonProps = {
  thisSlide: number;
  currentSlide: number;
};

const TextButton: React.FC<TextButtonProps> = ({ thisSlide, currentSlide }) => {
  const textBtnRef = React.useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  // **
  const onTextBtnClick = () => {
    setIsActive((b) => !b);

    const text = textBtnRef.current?.nextElementSibling as HTMLParagraphElement;
    if (!text) return;

    if (isActive) {
      text.style.maxHeight = "";
      return;
    }

    const textSH = text.scrollHeight;
    text.style.maxHeight = textSH + "px";
  };

  // **
  React.useEffect(() => {
    const text = textBtnRef.current?.nextElementSibling as HTMLParagraphElement;
    if (!text) return;

    if (thisSlide !== currentSlide && isActive) {
      setIsActive(false);
      text.style.maxHeight = "";
    }
  });

  return (
    <button
      ref={textBtnRef}
      onClick={onTextBtnClick}
      className={s.textBtn}
      data-text-btn-active={isActive ? "true" : "false"}
      aria-label={`Show / hide entire message.`}
      aria-pressed={isActive ? "true" : "false"}></button>
  );
};

type TestimonialProps = {
  obj: TestimonialType;
  index: number;
  currentSlide: number;
  isEditable?: boolean;
  refetch?: () => void;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  obj,
  index,
  currentSlide,
  isEditable = false,
  refetch,
}) => {
  const [isShowAlertDelete, setIsShowAlertDelete] = React.useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = React.useState(false);

  const [deleteTestimonial, { isError, isSuccess, reset }] = useDeleteTestimonialMutation();

  // **
  const { data: session } = useSession();
  let isAuthor = false;

  if (session && isEditable) {
    const userId = session.user.id;

    if (userId) {
      isAuthor = true;
    }
  }

  // **
  const onDeleteClick = () => {
    setIsShowConfirmDelete(true);
  };

  const onConfirmDelete = (value: boolean) => {
    setIsShowConfirmDelete(false);

    if (value) {
      deleteTestimonial(obj.id);
    }
  };

  // **
  React.useEffect(() => {
    if (isError) {
      setIsShowAlertDelete(true);
    }

    if (isSuccess) {
      refetch && refetch();
    }

    reset();
  }, [isError, isSuccess]);

  return (
    <div key={obj.id} className={`${s.item} ${isEditable ? s.itemP0 : ""}`}>
      <div className={s.textWrapper}>
        <TextButton thisSlide={index} currentSlide={currentSlide} />
        <p className={s.text}>{obj.text}</p>
      </div>

      <div className={s.info}>
        <div className={s.imageWrapper}>
          <Image
            src={obj.imageUrl ? obj.imageUrl : Deafult}
            alt="Avatar of the author."
            className={s.image}
            fill
            sizes="48px"
          />
        </div>
        <div className={s.bottom}>
          <div className={s.metadata}>
            <span className={s.fullname}>{obj.fullname}</span>
            <span className={s.address}>{obj.address}</span>
          </div>
        </div>
      </div>

      {isAuthor && (
        <div className={`${s.toolbar} ${cs.toolbar}`}>
          <Link
            href={`/dashboard/change/testimonials/${obj.id}`}
            className={cs.toolbarBtn}
            aria-label="Edit testimonial.">
            <Edit aria-hidden="true" />
          </Link>

          <button
            className={cs.toolbarBtn}
            aria-label="Delete testimonial."
            onClick={onDeleteClick}>
            <Bin aria-hidden="true" />
          </button>
        </div>
      )}

      {isShowConfirmDelete && (
        <ConfirmDeleteTestimonialPopup onConfirmClick={(value) => onConfirmDelete(value)} />
      )}

      {isShowAlertDelete && (
        <AlertDeleteTestimonialPopup onAlertClick={() => setIsShowAlertDelete(false)} />
      )}
    </div>
  );
};
