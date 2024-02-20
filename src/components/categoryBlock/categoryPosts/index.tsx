import React from "react";

import {
  Article,
  Navigation,
  NavigationProps,
  CategoryNotFound,
  SkeletonArticle,
} from "../../../components";

import s from "./categoryPosts.module.scss";

interface CategoryPostsProps extends NavigationProps {
  posts: PostType[] | undefined;
  resetFilters: () => void;
  refetch: () => void;
}

export const CategoryPosts: React.FC<CategoryPostsProps> = ({
  posts,
  onPrevClick,
  onNextClick,
  page,
  totalPages,
  resetFilters,
  refetch,
}) => {
  if (posts && !posts.length) {
    return (
      <div className={s.rootWrapper}>
        <CategoryNotFound resetFilters={resetFilters} />
      </div>
    );
  }

  return (
    <div className={s.rootWrapper}>
      <ul className={s.root}>
        {!posts
          ? [...Array(3)].map((_, i) => (
              <li key={i} className={s.item}>
                <SkeletonArticle isCategoryPage={true} />
              </li>
            ))
          : posts.map((obj) => (
              <li key={obj.id} className={s.item}>
                <Article obj={obj} isCategoryPage={true} refetch={refetch} />
              </li>
            ))}
      </ul>

      {totalPages > 1 && (
        <Navigation
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
