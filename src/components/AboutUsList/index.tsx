"use client";

import React from "react";

import { useGetUsersQuery } from "../../redux/backendApi";

import { AuthorCard, Navigation } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./aboutUsList.module.scss";

// const authorsList: UserType[] = [
//   {
//     id: 1,
//     imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
//     fullname: "Floyd Miles",
//     email: "email@email.com",
//     profession: "Content Writer",
//     company: "Company",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 2,
//     imageUrl: "https://i.postimg.cc/c419Fqtq/94c1db47acb8141c7502d8724bd28fbd.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     email: "email@email.com",
//     company: "Company",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 3,
//     imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     email: "email@email.com",
//     company: "Company",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 4,
//     imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     email: "email@email.com",
//     company: "Company",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 5,
//     imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 6,
//     imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 7,
//     imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 8,
//     imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
//     fullname: "Floyd Miles",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
// ];

export const AboutUsList: React.FC = () => {
  const limit = 8;
  const [page, setPage] = React.useState(1);

  const request = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;
  const { data, isError } = useGetUsersQuery(request);
  const authorsList = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  if (!authorsList) {
    return;
  }

  const onPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === 1) return;

    setPage((n) => n - 1);
  };

  const onNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === totalPages) return;

    setPage((n) => n + 1);
  };

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>List of Authors</h2>

        <ul className={s.list}>
          {authorsList.map((obj) => (
            <li key={obj.id} className={s.item}>
              <AuthorCard author={obj} />
            </li>
          ))}
        </ul>

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
