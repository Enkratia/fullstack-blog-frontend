import { Metadata } from "next";
import { AboutUs, AboutUsList, Join, KnowMore, WhyThisBlog } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>About us</h1>
      <AboutUs />
      <KnowMore />
      <WhyThisBlog />
      <AboutUsList />
      <Join />
    </main>
  );
}
