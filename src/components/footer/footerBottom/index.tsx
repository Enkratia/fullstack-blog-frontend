import React, { Suspense } from "react";

import { fetchFooterBottomQuery } from "../../../fetchApi/fetchApi";

import { SkeletonFooterBottom, ToastComponent } from "../../../components";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./footerBottom.module.scss";
import Facebook from "../../../../public/img/facebook.svg";
import Twitter from "../../../../public/img/twitter.svg";
import Instagram from "../../../../public/img/instagram.svg";
import Linkedin from "../../../../public/img/linkedin.svg";

const socialLinks = {
  facebook: <Facebook aria-hidden="true" />,
  twitter: <Twitter aria-hidden="true" />,
  instagram: <Instagram aria-hidden="true" />,
  linkedin: <Linkedin aria-hidden="true" />,
};

export const FooterBottom: React.FC = async () => {
  const { data, args } = await fetchFooterBottomQuery();

  if (!data) {
    return (
      <>
        <SkeletonFooterBottom />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.info}>
        <span className={s.street}>{data.address}</span>
        <a href={`mailto:${data.email}`} className={s.email}>
          {data.email}
        </a>
        <a href={`tel:${data.phone.replace(/\s/g, "")}`} className={s.phone}>
          {data.phone}
        </a>
      </div>

      <ul className={s.social}>
        {Object.entries(socialLinks).map(([title, icon], i) => (
          <li key={i} className={s.socialItem}>
            <a
              href={data.socialLinks[title]}
              target="_blank"
              className={cs.socialBtn}
              aria-label={`Go to our ${capitalize(title)}`}>
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
