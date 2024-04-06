"use client";

import qs from "qs";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetTestimonialQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import {
  NotFoundData,
  Pagination,
  Select,
  SkeletonTestimonial,
  Testimonial,
} from "../../../components";
import { getSortingIndex } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./changeTestimonialsBlock.module.scss";

const sorting = [
  { title: "Newer", code: "+createdAt" },
  { title: "Older", code: "-createdAt" },
] as const;

type SortingCode = (typeof sorting)[number]["code"];

const defaultHeight = 160;
const limit = 2;

const ChangeTestimonialsBlockSuspense: React.FC = () => {
  const dispatch = useAppDispatch();
  const listRef = React.useRef<HTMLUListElement>(null);
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

  const { data, isError, refetch, originalArgs, endpointName } = useGetTestimonialQuery(request, {
    skip: !isFetch,
  });

  const testimonials = data?.data;
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

  // **
  React.useEffect(() => {
    if (isNavigate) {
      router.push(requestLocal);
      isRouter.current = true;
    }
  }, [isNavigate]);

  // **
  React.useEffect(() => {
    if (!listRef.current) return;
    const textBtns = listRef.current.querySelectorAll("button");

    textBtns.forEach((btn) => {
      const text = btn.nextElementSibling;
      if (!text) return;

      const textSH = text.scrollHeight;
      if (textSH > defaultHeight) {
        btn.setAttribute("data-text-btn-visible", "");
      }
    });
  });

  // **
  const refetchTestimonialsAfterDelete = () => {
    if (testimonials?.length === 1 && page > 1) {
      setPage((n) => n - 1);
      setIsNavigate({});
      setIsFetch(true);

      return;
    }
  };

  // **
  const onSelectChange = (option: number) => {
    setActiveOption(option);

    setSort(sorting[option].code);
    setPage(1);
    setIsNavigate({});
    setIsFetch(true);
  };

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

  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
    setIsFetch(true);
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Testimonials</h2>

      <div className={`${s.tooltip} ${cs.tooltip}`}>
        <input
          value={search}
          onChange={onSearchChange}
          type="text"
          placeholder="Search"
          className={`${s.input} ${cs.input}`}
        />

        <Select
          classNameInput={cs.input}
          sorting={sorting}
          activeOption={activeOption}
          onSelectChange={onSelectChange}
        />
      </div>

      <Link href="/dashboard/change/testimonials/create" className={`${s.btn} ${cs.btn}`}>
        Create new testimonial
      </Link>

      {testimonials?.length === 0 ? (
        <NotFoundData />
      ) : (
        <ul className={s.list} ref={listRef}>
          {!testimonials
            ? [...Array(2)].map((_, i) => (
                <li key={i} className={s.item}>
                  <SkeletonTestimonial isDashboard={true} />
                </li>
              ))
            : testimonials.map((obj, i) => (
                <li key={obj.id} className={s.item}>
                  <Testimonial
                    obj={obj}
                    index={0}
                    currentSlide={0}
                    isEditable={true}
                    refetch={refetchTestimonialsAfterDelete}
                  />
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
export const ChangeTestimonialsBlock: React.FC = () => (
  <Suspense>
    <ChangeTestimonialsBlockSuspense />
  </Suspense>
);
