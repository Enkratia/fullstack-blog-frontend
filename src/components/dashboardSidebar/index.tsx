"use client";

import React from "react";

import cs from "../../scss/helpers.module.scss";
import s from "./dashboardSidebar.module.scss";
import AngleDown from "../../../public/img/angle-down.svg";

export const DashboardSidebar: React.FC = () => {
  return (
    <nav className={s.root}>
      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <a href="" className={s.titleLink}>
            Edit
          </a>
        </h2>

        <div className={s.dropdown}>
          <button className={s.btn} aria-expanded={false} aria-controls="edit-about-us">
            About-us
            <AngleDown aria-hidden="true" />
          </button>

          <ul className={s.list} id="edit-about-us">
            <li className={s.item}>
              <a href="" className={s.link}>
                Section 1
              </a>
            </li>

            <li className={s.item}>
              <a href="" className={s.link}>
                Section 2
              </a>
            </li>
          </ul>
        </div>

        <div className={s.dropdown}>
          <button className={s.btn} aria-expanded={false} aria-controls="edit-home">
            Home
            <AngleDown aria-hidden="true" />
          </button>

          <ul className={s.list} id="edit-home">
            <li className={s.item}>
              <a href="" className={s.link}>
                Section 3
              </a>
            </li>

            <li className={s.item}>
              <a href="" className={s.link}>
                Section 4
              </a>
            </li>

            <li className={s.item}>
              <a href="" className={s.link}>
                Section 5
              </a>
            </li>

            <li className={s.item}>
              <a href="" className={s.link}>
                Section 8
              </a>
            </li>
          </ul>
        </div>

        <a href="" className={s.link}>
          Category
        </a>

        <a href="" className={s.link}>
          Contact-us
        </a>

        <a href="" className={s.link}>
          Footer
        </a>

        <a href="" className={s.link}>
          Privacy policy
        </a>
      </section>

      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <a href="" className={s.titleLink}>
            Change
          </a>
        </h2>

        <a href="" className={s.link}>
          Brands
        </a>

        <a href="" className={s.link}>
          Posts
        </a>

        <a href="" className={s.link}>
          Queries
        </a>

        <a href="" className={s.link}>
          Testimonials
        </a>
      </section>

      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <a href="" className={s.titleLink}>
            View
          </a>
        </h2>

        <a href="" className={s.link}>
          Messages
        </a>

        <a href="" className={s.link}>
          Users
        </a>
      </section>
    </nav>
  );
};
