"use client";

import ReactPaginate from "react-paginate";
import React from "react";

import s from "./pagination.module.scss";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: ({ selected }: Record<string, number>) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=""
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      pageCount={totalPages}
      previousLabel=""
      renderOnZeroPageCount={null}
      className={s.root}
      breakLinkClassName={s.rootBreak}
      nextClassName={s.rootNext}
      disabledClassName={s.rootDisabled}
      activeClassName={s.rootActive}
      activeLinkClassName={s.rootActiveLink}
    />
  );
};
