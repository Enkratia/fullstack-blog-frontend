import { AboutUs, AboutUsList, Join, KnowMore, WhyThisBlog } from "../../components";

import cs from "../../scss/helpers.module.scss";

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
