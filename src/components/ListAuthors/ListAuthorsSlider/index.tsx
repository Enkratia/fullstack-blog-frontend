"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useGetUsersQuery } from "../../../redux/backendApi";
import { AuthorCard } from "../../../components";

import s from "./listAuthorsSlider.module.scss";

// const authorsList: UserType[] = [
//   {
//     id: 1,
//     imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
//     fullname: "John Doe",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 2,
//     imageUrl: "https://i.postimg.cc/c419Fqtq/94c1db47acb8141c7502d8724bd28fbd.png",
//     fullname: "John Doe",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 3,
//     imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
//     fullname: "John Doe",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
//   {
//     id: 4,
//     imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
//     fullname: "John Doe",
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
//     fullname: "John Doe",
//     profession: "Content Writer",
//     company: "Company",
//     email: "email@email.com",
//     representation: "Lorem ipsum dolor sit amet consectetur adstin.",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//     posts: [],
//   },
// ];

export const ListAuthorsSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const request = "?_sort_createdAt&_order=DESC&_limit=10&_page=1";
  const { data, isError } = useGetUsersQuery(request);
  const authorsList = data?.data;

  if (!authorsList || authorsList.length < 4) {
    return;
  }

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider}>
        {authorsList.map((obj) => (
          <div key={obj.id} className={s.slide}>
            <AuthorCard author={obj} />
          </div>
        ))}
      </div>
    </div>
  );
};
