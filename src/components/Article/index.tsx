import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./article.module.scss";

type ArticleType = {
  obj: PostType;
  isCategoryPage?: boolean;
  isArticlePage?: boolean;
};

export const Article: React.FC<ArticleType> = ({
  obj,
  isCategoryPage = false,
  isArticlePage = false,
}) => {
  return (
    <article
      key={obj.id}
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
          <Image src={obj.imageUrl} alt={obj.title} fill className={s.image} />
        </Link>
      </div>

      <div className={s.data}>
        <span className={s.dataCategory}>{obj.category}</span>
        <h3 className={`${s.dataTitle} ${cs.title}`}>
          <Link href="">{obj.title}</Link>
        </h3>
        <p className={`${s.dataText} ${isCategoryPage ? s.dataTextCategoryPage : ""}`}>
          {obj.content}
        </p>
      </div>
    </article>
  );
};
