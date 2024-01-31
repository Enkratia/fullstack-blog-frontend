import { EditPostBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export default function EditPostPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Edit post page.</h1>
      <EditPostBlock />
    </main>
  );
}
