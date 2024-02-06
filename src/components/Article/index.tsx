import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { useDeletePostMutation } from "../../redux/backendApi";

import { ConfirmPopup, AlertPopup } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./article.module.scss";
import Bin from "../../../public/img/default/bin.svg";
import Edit from "../../../public/img/default/edit.svg";

type ArticleType = {
  obj: PostType;
  isCategoryPage?: boolean;
  isArticlePage?: boolean;
  refetch: () => void;
};

export const Article: React.FC<ArticleType> = ({
  obj: post,
  isCategoryPage = false,
  isArticlePage = false,
  refetch,
}) => {
  const [isShowAlert, setIsShowAlert] = React.useState(false);
  const [isShowConfirm, setIsShowConfirm] = React.useState(false);

  const [deletePost, { isError, isSuccess }] = useDeletePostMutation();

  const { data: session } = useSession();
  let isFeatured = post.isFeatured;
  let isAuthor = false;

  if (session) {
    const userId = session.user.id;
    const authorId = post.user.id;

    if (authorId && userId && authorId === userId) {
      isAuthor = true;
    }
  }

  // **
  const onDeleteClick = () => {
    setIsShowConfirm(true);
  };

  const onConfirmClick = (value: boolean) => {
    setIsShowConfirm(false);

    if (value) {
      deletePost(post.id);
    }
  };

  // **
  React.useEffect(() => {
    if (isSuccess) {
      refetch();
    }

    if (isError) {
      setIsShowAlert(true);
    }
  }, [isSuccess, isError]);

  return (
    <article
      key={post.id}
      className={`${s.root} ${isCategoryPage ? s.rootCategoryPage : ""} ${
        isArticlePage ? s.rootArticlePage : ""
      }`}>
      <div className={s.imageWrapper}>
        <Link
          href=""
          className={`${s.imageWrapperInner} ${
            isCategoryPage ? s.imageWrapperInnerCategoryPage : ""
          } ${isArticlePage ? s.imageWrapperInnerArticlePage : ""}`}
          aria-label="Go to the post.">
          <Image src={post.imageUrl} alt={post.title} fill className={s.image} />
        </Link>

        {isAuthor && (
          <div className={s.toolbar}>
            <Link href={`/edit-post/${post.id}`} className={s.toolbarBtn} aria-label="Edit post.">
              <Edit aria-hidden="true" />
            </Link>

            {!isFeatured && (
              <button className={s.toolbarBtn} aria-label="Delete post." onClick={onDeleteClick}>
                <Bin aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>

      {isShowConfirm && <ConfirmPopup onConfirmClick={(value) => onConfirmClick(value)} />}
      {isShowAlert && <AlertPopup onAlertClick={() => setIsShowAlert(false)} />}

      <div className={s.data}>
        <span className={s.dataCategory}>{post.category}</span>
        <h3 className={`${s.dataTitle} ${cs.title}`}>
          <Link href="">{post.title}</Link>
        </h3>
        <p className={`${s.dataText} ${isCategoryPage ? s.dataTextCategoryPage : ""}`}>
          {post.contentText}
        </p>
      </div>
    </article>
  );
};
