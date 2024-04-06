"use client";

import qs from "qs";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";
import { setToast } from "../../redux/toastSlice/slice";
import { useAppDispatch } from "../../redux/store";

import { Article, Navigation, SkeletonArticle } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./allPosts.module.scss";

const AllPostsSuspense: React.FC = () => {
  const dispatch = useAppDispatch();
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

  const { data, isError, refetch, originalArgs, endpointName } = useGetPostsQuery(request);
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
  React.useEffect(() => {
    if (isError || posts?.length === 0) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load some data.",
        }),
      );
    }
  }, [isError, posts?.length]);

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

  // **
  const refetchPostsAfterDelete = () => {
    if (posts?.length === 1 && page > 1) {
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
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={s.title}>All posts</h2>
        <div className={s.posts}>
          {!posts
            ? [...Array(5)].map((_, i) => <SkeletonArticle key={i} />)
            : posts.map((obj) => (
                <Article key={obj.id} obj={obj} refetch={refetchPostsAfterDelete} />
              ))}
        </div>

        {totalPages > 1 && (
          <Navigation
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
};

// **
export const AllPosts: React.FC = () => (
  <Suspense>
    <AllPostsSuspense />
  </Suspense>
);

// import qs from "qs";

// import React, { Suspense } from "react";

// import { fetchPostsQuery } from "../../fetchApi/fetchApi";

// import { AllPostsLayer, SkeletonAboutUs } from "../../components";

// type AllPostsProps = {
//   searchParams: Record<string, string>;
// };
// const limit = 5;

// const AllPostsSuspense: React.FC<AllPostsProps> = async ({ searchParams }) => {
//   const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
//   const urlPage = Number(urlSearch._page || "1");
//   const request = `?_page=${urlPage}&_limit=${limit}&_sort=createdAt&_order=DESC`;

//   const { data } = await fetchPostsQuery(request);

//   return <AllPostsLayer data={data} searchParams={searchParams} />;
// };

// // **
// export const AllPosts: React.FC<AllPostsProps> = ({ searchParams }) => (
//   <Suspense fallback={<SkeletonAboutUs ></SkeletonAboutUs>}>
//     <AllPostsSuspense searchParams={searchParams} />
//   </Suspense>
// );

// // **
// export const AllPosts: React.FC<AllPostsProps> = ({ data }) => (
//   <Suspense>
//     <AllPostsSuspense data={data} />
//   </Suspense>
// );
