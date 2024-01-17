import React from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchPostsQuery } from "../../fetchApi/fetchApi";
import { formatDate } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./featuredPosts.module.scss";

// const allPosts: PostType[] = [
//   {
//     id: 1,
//     title: "8 Figma design systems that you can download for free today.",
//     category: "startup",
//     createdAt: "2023-11-03T17:44:30.644Z",
//     updatedAt: "2023-11-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//     tags: ["business", "experience"],
//     isFeatured: false,
//     views: 0,
//     user: {
//       id: 1,
//       email: "email@email.com",
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 2,
//     title: "8 Figma design systems that you can download for free today.",
//     category: "startup",
//     createdAt: "2023-11-03T17:44:30.644Z",
//     updatedAt: "2023-11-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//     tags: ["business", "experience"],
//     isFeatured: false,
//     views: 0,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       email: "email@email.com",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 3,
//     title: "8 Figma design systems that you can download for free today.",
//     category: "startup",
//     createdAt: "2023-11-03T17:44:30.644Z",
//     updatedAt: "2023-11-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//     tags: ["business", "experience"],
//     isFeatured: false,
//     views: 0,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       email: "email@email.com",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
//   {
//     id: 4,
//     title: "8 Figma design systems that you can download for free today.",
//     category: "startup",
//     createdAt: "2023-11-03T17:44:30.644Z",
//     updatedAt: "2023-11-03T17:44:30.644Z",
//     contentText:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     contentJson: "",
//     imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//     tags: ["business", "experience"],
//     isFeatured: false,
//     views: 0,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       email: "email@email.com",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     },
//   },
// ];

// const post: PostType = {
//   id: 1,
//   title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//   category: "startup",
//   createdAt: "2023-11-03T17:44:30.644Z",
//   updatedAt: "2023-11-03T17:44:30.644Z",
//   contentText:
//     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//   contentJson: "",
//   imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//   tags: ["business", "experience"],
//   isFeatured: true,
//   views: 0,
//   user: {
//     id: 1,
//     fullname: "John Doe",
//     imageUrl: "",
//     profession: "",
//     email: "email@email.com",
//     company: "",
//     representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//   },
// };

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
                  className={s.featuredImage}
                />
              </div>
            </div>

            <div className={`${s.featuredMetadata} ${cs.metadata}`}>
              <span className={cs.metadataItem}>
                By
                <Link
                  href={`/users/${featuredPost.user.id}`}
                  className={cs.metadataName}>{` ${featuredPost.user.fullname}`}</Link>
              </span>
              <span className={cs.metadataItem}>{formatDate(featuredPost.createdAt)}</span>
            </div>

            <Link href="" className={s.featuredTitleSecondLink}>
              <h3 className={s.featuredTitleSecond}>{featuredPost.title}</h3>
            </Link>

            <p className={s.featuredDescr}>{featuredPost.contentText}</p>

            <Link href="" className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
          </div>
        </div>

        <div className={s.all}>
          <div className={s.allHead}>
            <h2 className={`${s.allTitle} ${cs.title}`}>All Posts</h2>
            <Link href="" className={s.allView}>
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
                        href={`/users/${obj.user.id}`}
                        className={cs.metadataName}>{` ${featuredPost.user?.fullname}`}</Link>
                    </span>
                    <span className={cs.metadataItem}>{formatDate(obj.createdAt)}</span>
                  </div>

                  <Link href="" className={s.allTitleSecondLink}>
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
