import { Metadata } from "next";

import { AccountLayout, MyPosts } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "My posts",
};

const MyPostsPage: React.FC = () => {
  return (
    <AccountLayout>
      <section>
        <h1 className={cs.srOnly}>Your posts</h1>

        <MyPosts />
      </section>
    </AccountLayout>
  );
};

export default MyPostsPage;
