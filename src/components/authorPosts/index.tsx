"use client";

import qs from "qs";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article, Navigation } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./authorPosts.module.scss";

// const NoPosts: React.FC = () => {
//   return (
//     <section className={s.root}>
//       <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
//         <h2 className={s.title}>My Posts</h2>

//         <p>No posts.</p>
//       </div>
//     </section>
//   );
// };

// const posts: PostType[] = [
//   {
//     id: 1,
//     title: "Font sizes in UI design: The complete guide to follow",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     views: 0,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       email: "email@email.com",
//       profession: "",
//       company: "",
//       representation: "Lorem ipsum dolor sit amet, consectetur",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 2,
//     title: "How to build rapport with your web design clients",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     views: 0,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       email: "email@email.com",
//       profession: "",
//       company: "",
//       representation: "Lorem ipsum dolor sit amet, consectetur",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
// ];

export const AuthorPosts: React.FC = () => {
  const limit = 2;

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const { id } = useParams();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  const request = `?_page=${page}&_limit=${limit}&user.id=${id}&_sort=createdAt&_order=DESC`;
  const requestlocal = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data, isError, isLoading, refetch } = useGetPostsQuery(request);
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
      router.push(requestlocal, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  if (isError) {
    console.warn("Failed to load author`s posts");
  }

  if (!posts) {
    return;
  }

  // **
  const refetchPostsAfterDelete = () => {
    if (posts.length === 1 && page > 1) {
      setPage((n) => n - 1);
      setIsNavigate({});

      return;
    }

    refetch();
  };

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
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <h2 className={s.title}>My Posts</h2>

        {posts.length === 0 ? (
          <p>No posts.</p>
        ) : (
          <ul className={s.list}>
            {posts.map((post) => (
              <li key={post.id} className={s.item}>
                <Article obj={post} isArticlePage={true} refetch={refetchPostsAfterDelete} />
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <Navigation
            page={page}
            totalPages={totalPages}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        )}
      </div>
    </section>
  );
};
