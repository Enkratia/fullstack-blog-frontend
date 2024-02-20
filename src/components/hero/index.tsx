import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchPostsQuery } from "../../fetchApi/fetchApi";

import { SkeletonHero } from "../../components";

import { formatDate } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./hero.module.scss";

const HeroSuspense: React.FC = async () => {
  const request = "?isFeatured=true";

  const { data, isError } = await fetchPostsQuery(request);
  const post = data?.data[0];

  if (!post) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{post.title}</h2>
      <div className={`${s.container} ${cs.container}`}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          className={s.image}
          aria-hidden="true"
          priority={true}
          sizes="100vw"
          fill
        />

        <div className={s.content}>
          <span className={s.subtitle}>
            Posted on
            <Link
              href={`/blog/${post.category}`}
              className={s.category}>{` ${post.category}`}</Link>
          </span>
          <p className={`${s.title} ${cs.title}`}>
            <Link href={`/blog/${post.category}/${post.id}`} className={s.titleLink}>
              {post.title}
            </Link>
          </p>

          <div className={`${s.metadata} ${cs.metadata} ${cs.metadataGold}`}>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              By
              <Link
                href={`/author/${post.user.id}`}
                className={`${cs.metadataName} ${cs.metadataNameGold}`}>{` ${post.user.fullname}`}</Link>
            </span>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              {formatDate(post.createdAt)}
            </span>
          </div>

          <p className={s.descr}>{post.contentText}</p>

          <Link
            href={`/blog/${post.category}/${post.id}`}
            className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
        </div>
      </div>
    </section>
  );
};

// **
export const Hero: React.FC = async () => (
  <Suspense fallback={<SkeletonHero />}>
    <HeroSuspense />
  </Suspense>
);
