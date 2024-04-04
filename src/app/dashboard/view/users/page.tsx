import React from "react";
import type { Metadata } from "next";

import { ViewUsersBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "View: Users",
};

const DashboardViewUsersPage: React.FC = () => {
  return <ViewUsersBlock />;
};

export default DashboardViewUsersPage;

// import React from "react";
// import type { Metadata } from "next";

// import qs from "qs";

// import { fetchUsersQuery } from "../../../../fetchApi/fetchApi";

// import { NotFoundData, ToastComponent, ViewUsersBlock } from "../../../../components";

// export const metadata: Metadata = {
//   title: "View: Users",
// };

// type DashboardViewUsersPage = {
//   searchParams: Record<string, string>;
// };

// const sorting = [
//   { title: "Newer", code: "+createdAt" },
//   { title: "Older", code: "-createdAt" },
// ] as const;

// type SortingCode = (typeof sorting)[number]["code"];

// const limit = 3;

// const DashboardViewUsersPage: React.FC<DashboardViewUsersPage> = async ({ searchParams }) => {
//   // const getUrlSearch = () => {
//   // const urlSP = {
//   //   urlPage: Number(searchParams._page || "1"),
//   //   urlSearch: String(searchParams._q || ""),
//   //   urlSort: (searchParams._sort as SortingCode) || sorting[0].code,
//   // };
//   const urlPage = Number(searchParams._page || "1");
//   const urlSearch = String(searchParams._q || "");
//   const urlSort = (searchParams._sort as SortingCode) || sorting[0].code;

//   // return { urlPage, urlSearch, urlSort };
//   //   return urlSP;
//   // };
//   // const { urlPage, urlSearch, urlSort } = getUrlSearch();

//   // const a = getUrlSearch();
//   // type B = typeof a;

//   // const urlPage = Number(searchParams._page || "1");
//   // const urlSearch = String(searchParams._q || "");
//   // const urlSort = (searchParams._sort as SortingCode) || sorting[0].code;

//   class Request {
//     _page = urlPage;
//     _limit = limit;
//     _q = urlSearch;

//     _order;
//     _sort;

//     constructor(isExtend: boolean) {
//       this._order = isExtend ? (urlSort.startsWith("-") ? "asc" : "desc") : undefined;
//       this._sort = isExtend ? urlSort.slice(1, urlSort.length) : urlSort;
//     }
//   }

//   const request = `?${qs.stringify(new Request(true), { encode: true })}`;

//   // **
//   const { data, isError, args } = await fetchUsersQuery(request);

//   if (!data || isError) {
//     return (
//       <>
//         <NotFoundData />
//         <ToastComponent type="warning" args={args} text="Failed to load some data." />
//       </>
//     );
//   }

//   return <ViewUsersBlock data={data} searchParams={searchParams} />;
// };

// export default DashboardViewUsersPage;
