"use client";

import qs from "qs";

import React from "react";
import { useImmer } from "use-immer";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useOverlayScrollbars } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useGetPostsQuery } from "../../../redux/backendApi";

import { CategoryCategories, CategoryPosts, CategoryTags } from "../../../components";
import { useMediaQuery } from "../../../utils/customHooks";
import { setOverflowHidden } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryLayer.module.scss";
import Close from "../../../../public/img/close.svg";

export const CategoryLayer: React.FC = () => {
  const limit = 3;

  const osOptions = {
    scrollbars: {
      theme: s.osThemeSidebar,
    },
  };

  const sidebarRef = React.useRef<HTMLElement>(null);
  const [initialize, instance] = useOverlayScrollbars({ options: osOptions, defer: true });

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const { category: urlCategory } = useParams();

  const { isMQ1024 } = useMediaQuery();
  const [isVisible, setIsVisible] = React.useState(false);

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");
    const urlTags = (urlSearch.tags_have as string[]) || [];

    return { urlPage, urlTags };
  };
  const { urlPage, urlTags } = getUrlSearch();

  const [category, setCategory] = React.useState(urlCategory as string);
  const [tags, setTags] = useImmer<string[]>(urlTags);
  const [page, setPage] = React.useState<number>(urlPage);

  class Request {
    _page = page;
    _limit = limit;
    _sort = "createdAt";
    _order = "DESC";
    tags_have = tags;

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

    return () => {
      setOverflowHidden(false);
    };
  }, [isMQ1024]);

  React.useEffect(() => {
    if (!isRouter.current) {
      urlTags !== tags && setTags(urlTags);
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
      instance()?.destroy();
      return;
    } else {
      if (sidebarRef.current) {
        initialize(sidebarRef.current);
      }
    }
  }, [isMQ1024, initialize, posts]);

  // **
  const resetFilters = () => {
    setTags([]);
    setPage(1);

    setIsNavigate({});
  };

  const onTagClick = (e: React.MouseEvent<HTMLAnchorElement>, tag: string) => {
    e.preventDefault();

    setTags((tags) => {
      if (!tags.includes(tag)) {
        if (tags.length > 30) return;

        tags.push(tag);
        return tags;
      }

      const idx = tags.indexOf(tag);
      tags.splice(idx, 1);
      return tags;
    });

    setPage(1);
    setIsNavigate({});
  };

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
        resetFilters={resetFilters}
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

          <aside ref={sidebarRef} className={s.sidebar}>
            <CategoryCategories onCategoryClick={onCategoryClick} />
            <CategoryTags onTagClick={onTagClick} />
          </aside>
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
