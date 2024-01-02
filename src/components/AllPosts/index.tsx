"use client";

import qs from "qs";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";
import { Article, Navigation } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./allPosts.module.scss";

// const posts: PostType[] = [
//   {
//     id: 1,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "Floyd Miles",
//       email: "email@email.com",
//       imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 2,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "Floyd Miles",
//       email: "email@email.com",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 3,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "Floyd Miles",
//       email: "email@email.com",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 4,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "Floyd Miles",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       email: "email@email.com",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 5,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "Floyd Miles",
//       imageUrl: "",
//       profession: "",
//       email: "email@email.com",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
// ];

export const AllPosts: React.FC = () => {
  const limit = 5;

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const searchParams = useSearchParams().toString();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  const request = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data, isError } = useGetPostsQuery(request);
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  React.useEffect(() => {
    if (!isRouter.current) {
      urlPage !== page && setPage(urlPage);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(request, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  if (!posts || !totalCount) {
    return;
  }

  // **
  const onPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === 1) return;

    setPage((n) => n - 1);
    setIsNavigate({});
  };

  const onNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === totalPages) return;

    setPage((n) => n + 1);
    setIsNavigate({});
  };

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={s.title}>All posts</h2>
        <div className={s.posts}>
          {posts.map((obj) => (
            <Article key={obj.id} obj={obj} />
          ))}
        </div>

        <Navigation
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};
