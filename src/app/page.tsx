import {
  ChooseCategory,
  FeaturedIn,
  FeaturedPosts,
  Hero,
  Join,
  ListAuthors,
  Testimonials,
  UsMission,
  WhyWeStarted,
} from "../components";

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
      <FeaturedIn />
      <Testimonials />
      <Join />
    </main>
  );
}
