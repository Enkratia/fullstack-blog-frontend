import { Metadata } from "next";

import { MyPosts } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "My posts",
};

const MyPostsPage: React.FC = () => {
  return (
    <section>
      <h1 className={cs.srOnly}>Your posts</h1>

      <MyPosts />
    </section>
  );
};

export default MyPostsPage;
