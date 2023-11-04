import { BlogHeader } from "@/components";

import s from "./page.module.scss";
import cs from "../../scss/helpers.module.scss";

export default function BlogPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Blog page</h1>
      <BlogHeader />
    </main>
  );
}
