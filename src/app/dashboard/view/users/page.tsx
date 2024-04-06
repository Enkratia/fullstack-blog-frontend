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

// import { ViewUsersBlock } from "../../../../components";

// import { fetchUsersQuery } from "../../../../fetchApi/fetchApi";

// export const metadata: Metadata = {
//   title: "View: Users",
// };

// type DashboardViewUsersPageProps = {
//   searchParams: Record<string, string>;
// };

// const sorting = [
//   { title: "Newer", code: "+createdAt" },
//   { title: "Older", code: "-createdAt" },
// ] as const;

// type SortingCode = (typeof sorting)[number]["code"];

// const limit = 3;

// const DashboardViewUsersPage: React.FC<DashboardViewUsersPageProps> = async ({ searchParams }) => {
//   const urlSP = qs.parse(searchParams, { arrayLimit: 1000 });
//   const urlPage = Number(urlSP._page || "1");
//   const urlSearch = String(urlSP._q || "");
//   const urlSort = (urlSP._sort as SortingCode) || sorting[0].code;

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
//   const { data } = await fetchUsersQuery(request);

//   return <ViewUsersBlock data={data} searchParams={searchParams} />;
// };

// export default DashboardViewUsersPage;
