import { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBlock, CategoryHeader } from "../../../components";
import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";

const categories = ["startup", "business", "economy", "technology"];

type BlogCategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params: { category } }: BlogCategoryPageProps) {
  const title = category ? capitalize(category) : "Blog category";
  const description = `Page where you can see all our posts for ${category} category`;

  return {
    title,
    description,
  };
}

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
