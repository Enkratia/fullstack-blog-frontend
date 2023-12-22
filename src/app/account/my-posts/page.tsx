import { MyPosts } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const MyPostsPage: React.FC = () => {
  return (
    <section>
      <h1 className={cs.srOnly}>Your posts</h1>
      <MyPosts />
    </section>
  );
};

export default MyPostsPage;
