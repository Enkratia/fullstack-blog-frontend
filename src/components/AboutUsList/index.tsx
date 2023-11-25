import React from "react";

import { AuthorCard } from ".././../components";

import cs from "../../scss/helpers.module.scss";
import s from "./AboutUsList.module.scss";

const authorsList: UserType[] = [
  {
    id: 1,
    imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
    firstName: "Floyd",
    lastName: "Miles",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 2,
    imageUrl: "https://i.postimg.cc/c419Fqtq/94c1db47acb8141c7502d8724bd28fbd.png",
    firstName: "Dianne",
    lastName: "Russell",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 3,
    imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
    firstName: "Jenny",
    lastName: "Wilson",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 4,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 5,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: null }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 6,
    imageUrl: "https://i.postimg.cc/QNJYgNtk/e2521d1f9982ee7c506948d0020e937f.png",
    firstName: "Jenny",
    lastName: "Wilson",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 7,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: "#" }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
  {
    id: 8,
    imageUrl: "https://i.postimg.cc/zGVd1nk0/f310490df993fe9cb9b6b77f5e1512cb.png",
    firstName: "Leslie",
    lastName: "Alexander",
    profession: "Content Writer",
    company: "Company",
    representation: "Lorem ipsum dolor sit amet consectetur adstin.",
    userLinks: [{ facebook: null }, { twitter: "#" }, { instagram: "#" }, { linkedin: "#" }],
  },
];

export const AboutUsList: React.FC = () => {
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
      </div>
    </section>
  );
};
