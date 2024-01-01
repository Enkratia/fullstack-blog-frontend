"use client";

import qs from "qs";

import React from "react";

import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useGetPostsQuery } from "../../../redux/backendApi";

import { CategoryCategories, CategoryPosts, CategoryTags, Navigation } from "../../../components";
import { useMediaQuery } from "../../../utils/customHooks";
import { setOverflowHidden } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryLayer.module.scss";
import Close from "../../../../public/img/close.svg";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export const CategoryLayer: React.FC = () => {
  const sidebarRef = React.useRef<OverlayScrollbarsComponentRef<"aside">>(null);
  const limit = 1;

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const { category: urlCategory } = useParams();
  const searchParams = useSearchParams().toString();

  const { isMQ1024 } = useMediaQuery();
  const [isVisible, setIsVisible] = React.useState(false);

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams);
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);
  const [category, setCategory] = React.useState(urlCategory);

  class Request {
    _page = page;
    _limit = limit;
    _sort = "createdAt";
    _order = "DESC";

    category;

    constructor(isExtend: boolean) {
      if (isExtend) {
        this.category = category;
      }
    }
  }

  const requestLocal = `?${qs.stringify(new Request(false))}`;
  const request = `?${qs.stringify(new Request(true))}`;

  const { data, isError } = useGetPostsQuery(request);
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  React.useEffect(() => {
    if (isMQ1024) {
      setIsVisible(false);
      setOverflowHidden(false);
    }
  }, [isMQ1024]);

  React.useEffect(() => {
    if (!isRouter.current) {
      urlPage !== page && setPage(urlPage);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(`/blog/${category}${requestLocal}`, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  React.useEffect(() => {
    if (isMQ1024) {
      sidebarRef.current?.osInstance()?.destroy();
      console.log("destroy");
    } else {
      sidebarRef.current?.osInstance()?.update(true);
      console.log("update");
    }
  }, [isMQ1024]);

  // **
  const onCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, ctg: string) => {
    e.preventDefault();
    setCategory(ctg);
    setPage(1);

    setIsNavigate({});
  };

  // **
  const onSidebarClick = () => {
    setIsVisible((b) => !b);
    setOverflowHidden(!isVisible);
  };

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

  // **
  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMQ1024) return;

    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");
    onSidebarClick();
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMQ1024) return;

    if (e.target === e.currentTarget) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  // **
  const scrollbarOptions = {
    scrollbars: {
      theme: s.osThemeSidebar,
    },
  };

  if (!posts) {
    return;
  }

  return (
    <div className={`${s.container} ${cs.container}`}>
      <CategoryPosts
        posts={posts}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        page={page}
        totalPages={totalPages}
      />

      <div
        onClick={onModalOutsideClick}
        onPointerDown={onModalPointerDown}
        className={`${s.sidebarWrapper} ${isVisible ? s.sidebarWrapperActive : ""}`}>
        <div className={s.sidebarWrapperInner}>
          <div className={s.sidebarHead}>
            <p className={`${s.sidebarTitle} ${cs.title}`}>Blog Sidebar</p>

            <button
              onClick={onSidebarClick}
              className={s.sidebarClose}
              aria-label="Close the modal window.">
              <Close aria-hidden="true" />
            </button>
          </div>

          <OverlayScrollbarsComponent
            element="aside"
            options={scrollbarOptions}
            defer
            ref={sidebarRef}
            className={s.sidebar}>
            <CategoryCategories onCategoryClick={onCategoryClick} />
            <CategoryTags />
          </OverlayScrollbarsComponent>
        </div>
      </div>

      <div className={s.showWrapper}>
        <button onClick={onSidebarClick} className={`${s.show} ${cs.btn}`}>
          Blog Sidebar
        </button>
      </div>
    </div>
  );
};
