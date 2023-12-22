import { AuthorHeader, AuthorPosts } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export default function AuthorPage() {
  return (
    <main>
      {/* Изменить на имя */}
      <h1 className={cs.srOnly}>Author&apos;s page</h1>
      <AuthorHeader />
      <AuthorPosts />
    </main>
  );
}
