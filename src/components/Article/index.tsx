import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { useDeletePostMutation, useUpdateFeaturedPostMutation } from "../../redux/backendApi";

import {
  ConfirmDeletePostPopup,
  ConfirmUpdateFeaturedPostPopup,
  AlertDeletePostPopup,
  AlertUpdateFeaturedPostPopup,
} from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./article.module.scss";
import Bin from "../../../public/img/default/bin.svg";
import Edit from "../../../public/img/default/edit.svg";
import Star from "../../../public/img/default/star.svg";

type ArticleType = {
  obj: PostType;
  isCategoryPage?: boolean;
  isArticlePage?: boolean;
  isEditable?: boolean;
  refetch?: () => void;
};

export const Article: React.FC<ArticleType> = ({
  obj: post,
  isCategoryPage = false,
  isArticlePage = false,
  isEditable = false,
  refetch,
}) => {
  const [isShowAlertUpdate, setIsShowAlertUpdate] = React.useState(false);
  const [isShowAlertDelete, setIsShowAlertDelete] = React.useState(false);

  const [isShowConfirmUpdate, setIsShowConfirmUpdate] = React.useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = React.useState(false);

  const [
    deletePost,
    {
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      reset: resetDelete,
    },
  ] = useDeletePostMutation();

  const [
    updateFeaturedPost,
    {
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      reset: resetUpdate,
    },
  ] = useUpdateFeaturedPostMutation();

  // **
  const { data: session } = useSession();
  let isFeatured = post.isFeatured;
  let isAuthor = false;

  if (session && isEditable) {
    const userId = session.user.id;
    const authorId = post.user.id;

    if (authorId && userId && authorId === userId) {
      isAuthor = true;
    }
  }

  // **
  const onUpdateFeaturedClick = () => {
    setIsShowConfirmUpdate(true);
  };

  const onUpdateConfirmClick = (value: boolean) => {
    setIsShowConfirmUpdate(false);

    if (value) {
      updateFeaturedPost(post.id);
    }
  };

  // **
  const onDeleteClick = () => {
    setIsShowConfirmDelete(true);
  };

  const onDeleteConfirmClick = (value: boolean) => {
    setIsShowConfirmDelete(false);

    if (value) {
      deletePost(post.id);
    }
  };

  // **
  React.useEffect(() => {
    if (isUpdateSuccess) {
      refetch && refetch();
      resetUpdate();
    }

    if (isUpdateError) {
      setIsShowAlertUpdate(true);
      resetUpdate();
    }
  }, [isUpdateError, isUpdateSuccess]);

  React.useEffect(() => {
    if (isDeleteSuccess) {
      refetch && refetch();
      resetDelete();
    }

    if (isDeleteError) {
      setIsShowAlertDelete(true);
      resetDelete();
    }
  }, [isDeleteSuccess, isDeleteError]);

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
          <div className={`${s.toolbar} ${cs.toolbar}`}>
            <Link href={`/edit-post/${post.id}`} className={cs.toolbarBtn} aria-label="Edit post.">
              <Edit aria-hidden="true" />
            </Link>

            {!isFeatured && (
              <>
                <button
                  className={cs.toolbarBtn}
                  aria-label="Delete post."
                  onClick={onDeleteClick}
                  disabled={isUpdateLoading}>
                  <Bin aria-hidden="true" />
                </button>

                <button
                  className={cs.toolbarBtn}
                  aria-label="Mark post as featured."
                  onClick={onUpdateFeaturedClick}
                  disabled={isDeleteLoading}>
                  <Star aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isShowConfirmDelete && (
        <ConfirmDeletePostPopup onConfirmClick={(value) => onDeleteConfirmClick(value)} />
      )}

      {isShowConfirmUpdate && (
        <ConfirmUpdateFeaturedPostPopup onConfirmClick={(value) => onUpdateConfirmClick(value)} />
      )}

      {isShowAlertDelete && (
        <AlertDeletePostPopup onAlertClick={() => setIsShowAlertDelete(false)} />
      )}

      {isShowAlertUpdate && (
        <AlertUpdateFeaturedPostPopup onAlertClick={() => setIsShowAlertUpdate(false)} />
      )}

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
