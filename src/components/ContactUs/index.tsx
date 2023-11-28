import React from "react";

import { fetchContactUsQuery } from "@/fetchApi/fetchApi";

import { ContactUsForm } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./contactUs.module.scss";

// const data: ContactUsType = {
//   header: {
//     subtitle: "Contact us",
//     title: "Let’s Start a Conversation",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
//   },
//   time: {
//     days: "Monday To Friday",
//     hours: "9:00 AM to 8:00 PM",
//     description: "Our Support Team is available 24/7",
//   },
//   data: {
//     phone: "020 7993 2905",
//     email: "hello@finsweet.com",
//   },
// };

export const ContactUs: React.FC = async () => {
  const { data, isError } = await fetchContactUsQuery();

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Means to contact us.</h2>

      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <div className={s.header}>
          <span className={s.headerSubtitle}>{data.header.subtitle}</span>
          <p className={s.headerTitle}>{data.header.title}</p>
          <p className={s.headerDescr}>{data.header.description}</p>
        </div>

        <div className={s.info}>
          <div className={s.box}>
            <h3 className={s.boxTitle}>Working hours</h3>
            <span className={s.boxItem}>{data.time.days}</span>
            <span className={s.boxItem}>{data.time.hours}</span>
            <span className={`${s.boxItem} ${s.boxItemMuted}`}>{data.time.description}</span>
          </div>

          <div className={s.box}>
            <h3 className={s.boxTitle}>Contact Us</h3>
            <a href={`tel:${data.data.phone.replace(/\s/g, "")}`} className={s.boxItem}>
              {data.data.phone}
            </a>

            <a href={`mailto:${data.data.email}`} className={`${s.boxItem} ${s.boxItemMuted}`}>
              {data.data.email}
            </a>
          </div>
        </div>

        <ContactUsForm />
      </div>
    </section>
  );
};
