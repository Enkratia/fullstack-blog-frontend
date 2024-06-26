"use client";

import qs from "qs";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { Article, NotFoundData, Pagination, Select, SkeletonArticle } from "../../../components";
import { getSortingIndex } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./changePostsBlock.module.scss";

const sorting = [
  { title: "Newer", code: "+createdAt" },
  { title: "Older", code: "-createdAt" },
] as const;

type SortingCode = (typeof sorting)[number]["code"];

const limit = 3;

const ChangePostsBlockSuspense: React.FC = () => {
  const dispatch = useAppDispatch();
  const timer = React.useRef<NodeJS.Timeout>();

  // **
  const isRouter = React.useRef(false);
  const [isFetch, setIsFetch] = React.useState(true);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);

  const searchParams = useSearchParams().toString();
  const router = useRouter();

  const getUrlSearch = () => {
    const urlSP = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSP._page || "1");
    const urlSearch = String(urlSP._q || "");
    const urlSort = (urlSP._sort as SortingCode) || sorting[0].code;

    return { urlPage, urlSearch, urlSort };
  };
  const { urlPage, urlSearch, urlSort } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);
  const [search, setSearch] = React.useState(urlSearch);
  const [sort, setSort] = React.useState(urlSort);

  class Request {
    _page = page;
    _limit = limit;
    _q = search;

    _order;
    _sort;

    constructor(isExtend: boolean) {
      this._order = isExtend ? (sort.startsWith("-") ? "asc" : "desc") : undefined;
      this._sort = isExtend ? sort.slice(1, sort.length) : sort;
    }
  }

  let requestLocal = `?${qs.stringify(new Request(false), { encode: true })}`;
  let request = `?${qs.stringify(new Request(true), { encode: true })}`;

  const { data, isError, refetch, originalArgs, endpointName } = useGetPostsQuery(request, {
    skip: !isFetch,
  });

  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  const [activeOption, setActiveOption] = React.useState(getSortingIndex(sorting, sort));

  // **
  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load data.",
        }),
      );
    }
  }, [isError]);

  // **
  React.useEffect(() => {
    if (!isRouter.current) {
      setActiveOption(getSortingIndex(sorting, urlSort));
      setPage(urlPage);
      setSort(urlSort);
      setSearch(urlSearch);
      setIsFetch(true);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(requestLocal);
      isRouter.current = true;
    }
  }, [isNavigate]);

  // **
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current);
    setSearch(e.target.value);
    setIsFetch(false);

    timer.current = setTimeout(() => {
      setPage(1);
      setIsNavigate({});
      setIsFetch(true);
    }, 250);
  };

  // **
  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
    setIsFetch(true);
  };

  // **
  const onSelectChange = (option: number) => {
    setActiveOption(option);

    setSort(sorting[option].code);
    setPage(1);
    setIsNavigate({});
    setIsFetch(true);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Posts</h2>

      <div className={`${s.tooltip} ${cs.tooltip}`}>
        <input
          value={search}
          onChange={onSearchChange}
          type="text"
          placeholder="Search"
          className={`${s.input} ${cs.input}`}
        />

        <Select
          id=""
          classNameInput={cs.input}
          sorting={sorting}
          activeOption={activeOption}
          onSelectChange={onSelectChange}
        />
      </div>

      {posts?.length === 0 ? (
        <NotFoundData />
      ) : (
        <ul className={s.list}>
          {!posts
            ? [...Array(3)].map((_, i) => (
                <li key={i} className={s.item}>
                  <SkeletonArticle />
                </li>
              ))
            : posts.map((post) => (
                <li key={post.id} className={s.item}>
                  <Article obj={post} refetch={refetch} isEditable={true} />
                </li>
              ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
};

// **
export const ChangePostsBlock: React.FC = () => (
  <Suspense>
    <ChangePostsBlockSuspense />
  </Suspense>
);
