import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchPostsQuery } from "../../fetchApi/fetchApi";

import { SkeletonBlogHeader, ToastComponent } from "../../components";
import { formatDate } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./blogHeader.module.scss";

const BlogHeaderSuspense: React.FC = async () => {
  const request = "?isFeatured=true";

  const { data, args } = await fetchPostsQuery(request);
  const post = data?.data[0];

  if (!post) {
    return (
      <>
        <SkeletonBlogHeader />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Featured post: ${post.title}`}</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={s.subtitle}>Featured post</span>
          <h3 className={`${s.title} ${cs.title}`}>
            <Link href={`/blog/${post.category}/${post.id}`} className={s.titleLink}>
              {post.title}
            </Link>
          </h3>

          <div className={cs.metadata}>
            <span className={cs.metadataItem}>
              By
              <Link
                href={`/author/${post.user.id}`}
                className={cs.metadataName}>{` ${post.user.fullname}`}</Link>
            </span>
            <span className={cs.metadataItem}>{formatDate(post.createdAt)}</span>
          </div>

          <p className={s.text}>{post.contentText}</p>
          <Link
            href={`/blog/${post.category}/${post.id}`}
            className={`${s.link} ${cs.btn}`}>{`Read More >`}</Link>
        </div>

        <div className={s.right}>
          <div className={s.imageWrapper}>
            <Image
              src={post.imageUrl}
              alt="Image of the post."
              className={s.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// **
export const BlogHeader: React.FC = async () => (
  <Suspense fallback={<SkeletonBlogHeader />}>
    <BlogHeaderSuspense />
  </Suspense>
);
