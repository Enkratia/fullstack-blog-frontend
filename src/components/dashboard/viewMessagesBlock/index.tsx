"use client";

import qs from "qs";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGetContactUsMessagesQuery,
  useUpdateContactUsMessagesMutation,
} from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import {
  NotFoundData,
  Pagination,
  Select,
  SkeletonDashboardViewMessages,
} from "../../../components";
import { formatEmailDate, getSortingIndex } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./viewMessagesBlock.module.scss";

const sorting = [
  { title: "Newer", code: "+createdAt" },
  { title: "Older", code: "-createdAt" },
] as const;

type SortingCode = (typeof sorting)[number]["code"];

const limit = 5;

const ViewMessagesBlockSuspense: React.FC = () => {
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

  const { data, isError, refetch, originalArgs, endpointName } = useGetContactUsMessagesQuery(
    request,
    { skip: !isFetch },
  );

  const messages = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
  const [updateContactUsMessages] = useUpdateContactUsMessagesMutation();

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

  const onSelectChange = (option: number) => {
    setActiveOption(option);
    setSort(sorting[option].code);
    setPage(1);
    setIsNavigate({});
    setIsFetch(true);
  };

  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
    setIsFetch(true);
  };

  // **
  const onLinkClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    message: ContactUsMessageType,
  ) => {
    if (!message.read) {
      e.preventDefault();
      await updateContactUsMessages(message.id);
      await refetch();
      router.push(`/dashboard/view/messages/${message.id}`);
    }
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Messages</h2>

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

      {messages?.length === 0 ? (
        <NotFoundData />
      ) : (
        <ul className={s.list}>
          {!messages
            ? [...Array(5)].map((_, i) => <SkeletonDashboardViewMessages key={i} />)
            : messages.map((message) => (
                <li key={message.id} className={s.item}>
                  <Link
                    onClick={(e) => onLinkClick(e, message)}
                    href={`/dashboard/view/messages/${message.id}`}
                    className={`${s.link} ${message.read ? s.linkRead : ""}`}>
                    <span className={s.fullname}>{message.fullname}</span>
                    <span className={s.message}>{message.message}</span>
                    <span className={s.date}>{formatEmailDate(message.createdAt)}</span>
                  </Link>
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
export const ViewMessagesBlock: React.FC = () => (
  <Suspense>
    <ViewMessagesBlockSuspense />
  </Suspense>
);
