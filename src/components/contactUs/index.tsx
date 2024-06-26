import React, { Suspense } from "react";

import { fetchContactUsQueriesQuery, fetchContactUsQuery } from "../../fetchApi/fetchApi";

import { ContactUsForm, NotFoundOops, SkeletonContactUs } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./contactUs.module.scss";

const ContactUsSuspense: React.FC = async () => {
  const { data: info, isError: isInfoError } = await fetchContactUsQuery();
  const { data: queriesData, isError: isQueryError } = await fetchContactUsQueriesQuery("");

  if (!info || !queriesData || isInfoError || isQueryError) {
    return <NotFoundOops />;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Means to contact us.</h2>

      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <div className={s.header}>
          <span className={s.headerSubtitle}>{info.header.subtitle}</span>
          <p className={s.headerTitle}>{info.header.title}</p>
          <p className={s.headerDescr}>{info.header.description}</p>
        </div>

        <div className={s.info}>
          <div className={s.box}>
            <h3 className={s.boxTitle}>Working hours</h3>
            <span className={s.boxItem}>{info.time.days}</span>
            <span className={s.boxItem}>{info.time.hours}</span>
            <span className={`${s.boxItem} ${s.boxItemMuted}`}>{info.time.description}</span>
          </div>

          <div className={s.box}>
            <h3 className={s.boxTitle}>Contact Us</h3>
            <a href={`tel:${info.contact.phone.replace(/\s/g, "")}`} className={s.boxItem}>
              {info.contact.phone}
            </a>

            <a href={`mailto:${info.contact.email}`} className={`${s.boxItem} ${s.boxItemMuted}`}>
              {info.contact.email}
            </a>
          </div>
        </div>

        <ContactUsForm queries={queriesData.data} />
      </div>
    </section>
  );
};

// **
export const ContactUs: React.FC = () => (
  <Suspense fallback={<SkeletonContactUs />}>
    <ContactUsSuspense />
  </Suspense>
);
