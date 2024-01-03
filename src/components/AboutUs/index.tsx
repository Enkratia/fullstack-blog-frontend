import React from "react";

import { fetchAboutUsStaticQuery } from "../../fetchApi/fetchApi";

import { AboutUsHeader, AboutUsOverview, AboutUsVision } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./aboutUs.module.scss";

// const data: AboutUsStaticType = {
//   header: {
//     title: "We are a team of content writers who share their learnings",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   mission: {
//     title: "Creating valuable content for creatives all around the world",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
//   },
//   vision: {
//     title: "A platform that empowers individuals to improve",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
//   },
// };

// const data: AboutUsStaticType = {
//   imageUrl: "",
//   headerTitle: "We are a team of content writers who share their learnings",
//   headerDescription:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   missionTitle: "Creating valuable content for creatives all around the world",
//   missionDescription:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
//   visionTitle: "A platform that empowers individuals to improve",
//   visionDescription:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
// };

export const AboutUs: React.FC = async () => {
  const { data, isError } = await fetchAboutUsStaticQuery();

  if (!data) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Information about us.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <AboutUsHeader data={data} />
        <AboutUsOverview data={data} />
        <AboutUsVision data={data} />
      </div>
    </section>
  );
};
