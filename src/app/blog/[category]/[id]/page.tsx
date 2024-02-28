import { fetchPostByIdQuery } from "../../../../fetchApi/fetchApi";

import { Join, Post, WhatToReadNext } from "../../../../components";
import { capitalize } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";

type BlogPostPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: BlogPostPageProps) {
  const { data: post } = await fetchPostByIdQuery(id);

  const title = post?.title ? capitalize(post.title) : "Post";
  return { title };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params: { id } }) => {
  return (
    <main>
      <h1 className={cs.srOnly}>Post</h1>
      <Post id={id} />
      <WhatToReadNext />
      <Join />
    </main>
  );
};

export default BlogPostPage;
