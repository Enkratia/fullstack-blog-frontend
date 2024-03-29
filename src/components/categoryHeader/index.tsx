"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { useGetCategoryHeaderQuery } from "../../redux/backendApi";
import { useAppDispatch } from "../../redux/store";

import { SkeletonCategoryHeader } from "../../components";
import { capitalize } from "../../utils/customFunctions";
import { setToast } from "../../redux/toastSlice/slice";

import cs from "../../scss/helpers.module.scss";
import s from "./categoryHeader.module.scss";

const categories: CategoryNames = ["startup", "business", "economy", "technology"];

export const CategoryHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useParams().category as CategoryNames[number];

  const { data, isError, isLoading, isFetching, endpointName, originalArgs } =
    useGetCategoryHeaderQuery();

  const isFailed = isError || (!data && !isLoading && !isFetching);

  // **
  React.useEffect(() => {
    if (isFailed) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load some data.",
        }),
      );
    }
  }, [isFailed]);

  // **
  if (!categories.includes(category)) {
    return notFound();
  }

  if (!data) {
    return <SkeletonCategoryHeader />;
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <p className={s.title}>{capitalize(category)}</p>
        <p className={s.descr}>{data[category]}</p>

        <ul className={s.breadcrumbs}>
          <li className={s.item}>
            <Link href="/blog" className={s.link}>
              Blog
            </Link>
          </li>
          <li className={s.item}>
            <Link href="#" className={s.link}>
              {category}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
