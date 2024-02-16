// "use client";

import qs from "qs";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useGetTagsQuery } from "../../../redux/backendApi";

import { SkeletonTag } from "../../../components";
import { toArray } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryTags.module.scss";

type CategoryTagsProps = {
  onTagClick: (e: React.MouseEvent<HTMLAnchorElement>, tag: string) => void;
};

export const CategoryTags: React.FC<CategoryTagsProps> = ({ onTagClick }) => {
  const limit = 8;
  const searchParams = useSearchParams().toString();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlTags = (urlSearch.tags_have as string[]) || [];

    return { urlTags };
  };
  const { urlTags } = getUrlSearch();

  const [prevUrlTags, setPrevUrlTags] = React.useState(urlTags);
  const [tagPage, setTagePage] = React.useState(1);

  const request = `?_page=${tagPage}&_limit=${limit}`;
  const { data, isError } = useGetTagsQuery(request);
  const tags = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  React.useEffect(() => {
    if (!urlTags.length) {
      setPrevUrlTags([]);
    }
  }, [urlTags.length]);

  // **
  const onPrevClick = () => {
    if (tagPage === 1) return;

    setTagePage((n) => n - 1);
    setPrevUrlTags(urlTags);
  };

  const onNextlick = () => {
    if (tagPage === totalPages) return;

    setTagePage((n) => n + 1);
    setPrevUrlTags(urlTags);
  };

  // **
  const currentTags = Array.from(new Set([...prevUrlTags, ...toArray(tags || [])]));

  // const a = 5;

  return (
    <div className={s.root}>
      <h3 className={`${s.title} ${cs.title}`}>All Tags</h3>

      <ul className={s.list}>
        {!tags
          ? [...Array(8)].map((_, i) => (
              <li key={i} className={s.item}>
                <SkeletonTag key={i} />
              </li>
            ))
          : currentTags.map((tag) => (
              <li key={tag} className={s.item}>
                <Link
                  onClick={(e) => onTagClick(e, tag)}
                  href=""
                  className={`${s.tag} ${urlTags.includes(tag) ? s.tagActive : ""}`}>
                  {tag}
                </Link>
              </li>
            ))}
      </ul>

      {totalPages > 1 && (
        <div className={s.navigation}>
          <button
            onClick={onPrevClick}
            className={s.btn}
            disabled={tagPage === 1 ? true : false}
            aria-label={`Show previous ${limit} tags.`}></button>

          <button
            onClick={onNextlick}
            className={s.btn}
            disabled={tagPage === totalPages ? true : false}
            aria-label={`Show next ${limit} tags.`}></button>
        </div>
      )}
    </div>
  );
};
