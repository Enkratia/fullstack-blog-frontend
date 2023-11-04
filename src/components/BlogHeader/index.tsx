import React from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./BlogHeader.module.scss";

const post = {
  id: 1,
  title: "Step-by-step guide to choosing great font pairs",
  category: "startup",
  firstName: "John",
  lastName: "Doe",
  createdAt: "2023-11-03T17:44:30.644Z",
  updatedAt: "2023-11-03T17:44:30.644Z",
  text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/6374/8d1f/bd83d188028be8a810fd08204554ab09?Expires=1699833600&Signature=iK4SYeEbawVrKZlui6vWqApdqDRVjlMbndteIy9MhuXLNGhsQE1xlFRe600xMQcxOzcb506k5-6ycex8Q~DyTfHSx7Lxqmr5hQ2dxoXqQnFW339XxGBvukpL8VcVM72WpdouW022a9yCgpZ0kDtFoc~i6-fLeXL92TqN8JQLQfB33JwpX9~-7NxW72R4VBDFQhSdmGleW~EhREuf7R-1scDwBrfENqtTv3UTahsOoQ4ekbXoX0tgUUIIEJ9lIdhraSrH2snttB47zV~Rsr8dx8tAS9uON5ralEYTJ0HpzrJO1X9ZZ-UE6LIiyEjfK-ErEyz0DgAQYx3y0b8qJnKaQQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  tags: ["business", "experience"],
  isFeatured: true,
  authorId: 1,
};

export const BlogHeader: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Featured post: ${post.title}`}</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={s.subtitle}>Featured post</span>
          <h3 className={`${s.title} ${cs.title}`}>{post.title}</h3>

          <div className={s.metadata}>
            <span className={s.metadataItem}>
              By
              <Link
                href={`/users/${post.authorId}`}
                className={s.metadataName}>{` ${post.firstName} ${post.lastName}`}</Link>
            </span>
            <span className={s.metadataItem}>{formatDate(post.createdAt)}</span>
          </div>

          <p className={s.text}>{post.text}</p>
          <Link href={`/blog/${post.id}`} className={`${s.link} ${cs.btn}`}>{`Read More >`}</Link>
        </div>

        <div className={s.right}>
          <div className={s.imageWrapper}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            // width={515}
            // height={359}
            fill={true}
            layout={'fill'}
            objectFit={'cover'}
            className={s.image}
          />
          </div>
        </div>
      </div>
    </section>
  );
};
