import { Metadata } from "next";

import { AddPostBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Add post",
};

const AddPostPage: React.FC = () => {
  return (
    <section>
      <h1 className={cs.srOnly}>Editor to add new post</h1>

      <AddPostBlock />
    </section>
  );
};

export default AddPostPage;
