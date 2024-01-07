import { Join, Post, WhatToReadNext } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";

type BlogPostPageProps = {
  params: {
    id: string;
  };
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params: { id } }) => {
  return (
    <main>
      <h1 className={cs.srOnly}>Post</h1>
      <Post id={+id} />
      <WhatToReadNext />
      <Join />
    </main>
  );
};

export default BlogPostPage;
