import { Metadata } from "next";

import { AddPostBlock, AccountLayout } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Add post",
};

const AddPostPage: React.FC = () => {
  return (
    <AccountLayout>
      <h1 className={cs.srOnly}>Editor to add new post</h1>

      <AddPostBlock />
    </AccountLayout>
  );
};

export default AddPostPage;
