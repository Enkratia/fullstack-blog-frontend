import { AddPostBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const AddPostPage: React.FC = () => {
  return (
    <main>
      <h1 className={cs.srOnly}>Editor to add new post</h1>
      <AddPostBlock />
    </main>
  );
};

export default AddPostPage;
