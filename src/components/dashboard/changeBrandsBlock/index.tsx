"use client";

import qs from "qs";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetFeaturedInQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { Brand, NotFoundData, Pagination, SkeletonBrand } from "../../../components";
import { getSortingIndex } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./changeBrandsBlock.module.scss";
import AngleDown from "../../../../public/img/angle-down.svg";

const sorting = [
  { title: "Newer", code: "+createdAt" },
  { title: "Older", code: "-createdAt" },
] as const;

type SortingCode = (typeof sorting)[number]["code"];

const limit = 4;

export const ChangeBrandsBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const timer = React.useRef<NodeJS.Timeout>();

  // **
  const isRouter = React.useRef(true);
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

  const { data, isError, refetch, originalArgs, endpointName } = useGetFeaturedInQuery(request);
  const brands = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  const [active, setActive] = React.useState(getSortingIndex(sorting, sort));
  const [isOpen, setIsOpen] = React.useState(false);

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

  React.useEffect(() => {
    if (!isRouter.current) {
      setPage(urlPage);
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
  const refetchBrandsAfterDelete = () => {
    if (brands?.length === 1 && page > 1) {
      setPage((n) => n - 1);
      setIsNavigate({});

      return;
    }

    refetch();
  };

  // **
  const onSelectClick = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const select = e.currentTarget;
    setIsOpen((b) => !b);

    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);
  };

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    const select = e.currentTarget;

    if (e.key === "Enter") {
      setIsOpen((b) => !b);
    }

    function hideSelect(e: MouseEvent) {
      if (select && !e.composedPath().includes(select)) {
        setIsOpen(false);

        document.documentElement.removeEventListener("click", hideSelect);
      }
    }

    document.documentElement.addEventListener("click", hideSelect);
  };

  const onSelectOptionClick = (e: React.MouseEvent<HTMLLIElement>, idx: number, option: number) => {
    setActive(option);

    setSort(sorting[option].code);
    setPage(1);
    setIsNavigate({});
  };

  const onSelectOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    idx: number,
    option: number,
  ) => {
    if (e.key === "Enter") {
      setActive(option);

      setSort(sorting[option].code);
      setPage(1);
      setIsNavigate({});

      (e.currentTarget.closest('[role="listbox"]') as HTMLDivElement)?.focus();
    }
  };

  // **
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSearch(e.target.value);
      setPage(1);

      setIsNavigate({});
    }, 250);
  };

  // **
  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Brands</h2>

      <div className={`${s.tooltip} ${cs.tooltip}`}>
        <input
          defaultValue={search}
          onChange={onSearchChange}
          type="text"
          placeholder="Search"
          className={`${s.input} ${cs.input}`}
        />

        <div
          className={`${cs.select} ${cs.input}`}
          role="listbox"
          tabIndex={0}
          onKeyDown={(e) => onSelectKeyDown(e, 0)}
          onClick={(e) => onSelectClick(e, 0)}>
          <div className={`${cs.selectHead} ${active === 0 ? "" : cs.selectHeadActive}`}>
            <span className={cs.selectSelected}>{sorting[active].title}</span>
            <input type="hidden" name="option" value={sorting[active].title} />

            <AngleDown aria-hidden="true" className={cs.inputSvg} />
          </div>
          <div
            className={`${cs.selectWrapper} ${cs.input} ${isOpen ? cs.selectWrapperActive : ""}`}>
            <ul className={cs.selectList}>
              {sorting.map(({ title }, i) => (
                <li
                  key={i}
                  tabIndex={0}
                  className={`${cs.selectItem} ${active === i ? cs.selectItemActive : ""}`}
                  role="option"
                  aria-selected={active === i ? "true" : "false"}
                  onKeyDown={(e) => onSelectOptionKeyDown(e, 0, i)}
                  onClick={(e) => onSelectOptionClick(e, 0, i)}>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link href="/dashboard/change/brands/create" className={`${s.btn} ${cs.btn}`}>
        Create new brand
      </Link>

      {brands?.length === 0 ? (
        <NotFoundData />
      ) : (
        <ul className={s.list}>
          {!brands
            ? [...Array(4)].map((_, i) => (
                <li key={i} className={s.item}>
                  <SkeletonBrand />
                </li>
              ))
            : brands.map((brand) => (
                <li key={brand.id} className={s.item}>
                  <Brand obj={brand} isEditable={true} refetch={refetchBrandsAfterDelete} />
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
