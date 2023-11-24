import { AuthorHeader } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export default function AuthorPage() {
  return (
    <main>
      {/* Изменить на имя */}
      <h1 className={cs.srOnly}>Author's page</h1>
      <AuthorHeader />
    </main>
  );
}
