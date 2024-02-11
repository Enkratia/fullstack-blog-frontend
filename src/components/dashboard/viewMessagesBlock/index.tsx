"use client";

import qs from "qs";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGetContactUsMessagesQuery,
  useUpdateContactUsMessagesMutation,
} from "../../../redux/backendApi";

import { Pagination } from "../../../components";
import { formatEmailDate } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./viewMessagesBlock.module.scss";

const limit = 5;

export const ViewMessagesBlock: React.FC = () => {
  const isRouter = React.useRef(true);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);

  const searchParams = useSearchParams().toString();
  const router = useRouter();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  class Request {
    _page = page;
    _limit = limit;

    _sort;
    _order;

    constructor(isExtend: boolean) {
      if (isExtend) {
        this._sort = "createdAt";
        this._order = "DESC";
      }
    }
  }

  let requestLocal = `?${qs.stringify(new Request(false), { encode: true })}`;
  let request = `?${qs.stringify(new Request(true), { encode: true })}`;

  const { data, isError, refetch } = useGetContactUsMessagesQuery(request);
  const messages = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
  const [updateContactUsMessages] = useUpdateContactUsMessagesMutation();

  // **
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

  if (!messages) {
    return;
  }

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

  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Messages</h2>

      <ul className={s.list}>
        {messages.map((message) => (
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

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
};
