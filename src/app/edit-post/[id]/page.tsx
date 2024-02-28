import { Metadata } from "next";
import { EditPostBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Edit post",
};

export default function EditPostPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Edit post page.</h1>
      <EditPostBlock />
    </main>
  );
}
