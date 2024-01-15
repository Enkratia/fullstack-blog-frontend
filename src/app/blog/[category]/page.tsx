import { notFound } from "next/navigation";

import { CategoryBlock, CategoryHeader } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const categories = ["startup", "business", "economy", "technology"];

type BlogCategoryPageProps = {
  params: {
    category: string;
  };
};

const BlogCategoryPage: React.FC<BlogCategoryPageProps> = ({ params: { category } }) => {
  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <main>
      <h1 className={cs.srOnly}>Categories of blog.</h1>

      <CategoryHeader />
      <CategoryBlock />
    </main>
  );
};

export default BlogCategoryPage;
