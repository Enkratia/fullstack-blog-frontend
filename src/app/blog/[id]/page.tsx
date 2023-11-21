import { Join, Post, WhatToReadNext } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export default function BlogPostPage() {
  return (
    <main>
      {/* Change to title post */}
      <h1 className={cs.srOnly}>Blog post</h1>

      <Post />
      <WhatToReadNext />
      <Join />
    </main>
  );
}
