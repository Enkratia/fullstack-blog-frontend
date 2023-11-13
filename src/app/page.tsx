import {
  ChooseCategory,
  FeaturedPosts,
  Hero,
  ListAuthors,
  UsMission,
  WhyWeStarted,
} from "../components";

import s from "./page.module.scss";
import cs from "../scss/helpers.module.scss";

export default function Home() {
  return (
    <main>
      <h1 className={cs.srOnly}>Finsweet`s home page.</h1>
      <Hero />
      <FeaturedPosts />
      <UsMission />
      <ChooseCategory />
      <WhyWeStarted />
      <ListAuthors />
    </main>
  );
}
