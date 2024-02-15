import React from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchPostsQuery } from "../../fetchApi/fetchApi";

import { SkeletonFeaturedPosts } from "../../components";
import { formatDate } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./featuredPosts.module.scss";

export const FeaturedPosts: React.FC = async () => {
  const requestFeatured = "?isFeatured=true";
  const requestAllPosts = "?_sort=createdAt&_order=DESC&_limit=4&_page=1";

  const { data: featuredData, isError: isErrorFeatured } = await fetchPostsQuery(requestFeatured);
  const { data: allPostsData, isError: isErrorAllPosts } = await fetchPostsQuery(requestAllPosts);

  const featuredPost = featuredData?.data[0];
  const allPosts = allPostsData?.data;

  if (!featuredPost || !allPosts) {
    return;
  }

  // return <SkeletonFeaturedPosts />;

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.featured}>
          <h2 className={`${s.featuredTitle} ${cs.title}`}>Featured Post</h2>

          <div className={s.featuredContent}>
            <div className={s.featuredImageWrapper}>
              <div className={s.featuredImageWrapperInner}>
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={s.featuredImage}
                />
              </div>
            </div>

            <div className={`${s.featuredMetadata} ${cs.metadata}`}>
              <span className={cs.metadataItem}>
                By
                <Link
                  href={`/author/${featuredPost.user.id}`}
                  className={cs.metadataName}>{` ${featuredPost.user.fullname}`}</Link>
              </span>
              <span className={cs.metadataItem}>{formatDate(featuredPost.createdAt)}</span>
            </div>

            <Link
              href={`/blog/${featuredPost.category}/${featuredPost.user.id}`}
              className={s.featuredTitleSecondLink}>
              <h3 className={s.featuredTitleSecond}>{featuredPost.title}</h3>
            </Link>

            <p className={s.featuredDescr}>{featuredPost.contentText}</p>

            <Link
              href={`/blog/${featuredPost.category}/${featuredPost.user.id}`}
              className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
          </div>
        </div>

        <div className={s.all}>
          <div className={s.allHead}>
            <h2 className={`${s.allTitle} ${cs.title}`}>All Posts</h2>
            <Link href="/blog" className={s.allView}>
              View All
            </Link>
          </div>

          <ul className={s.allList}>
            {allPosts.map((obj) => (
              <li key={obj.id} className={s.allItem}>
                <article className={s.allPost}>
                  <div className={`${s.allMetadata} ${cs.metadata}`}>
                    <span className={cs.metadataItem}>
                      By
                      <Link
                        href={`/author/${obj.user.id}`}
                        className={cs.metadataName}>{` ${featuredPost.user?.fullname}`}</Link>
                    </span>
                    <span className={cs.metadataItem}>{formatDate(obj.createdAt)}</span>
                  </div>

                  <Link href={`/blog/${obj.category}/${obj.id}`} className={s.allTitleSecondLink}>
                    <p className={s.allTitleSecond}>{obj.title}</p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
