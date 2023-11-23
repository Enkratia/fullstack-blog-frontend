import { notFound } from "next/navigation";

import { CategoryHeader } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const categories = ["startup", "business", "economy", "technology"];

type ParamsType = {
  params: {
    category: string;
  };
};

export default function BlogCategoryPage({ params }: ParamsType) {
  if (!categories.includes(params.category)) {
    notFound();
  }

  return (
    <main>
      {/* Change to title post */}
      <h1 className={cs.srOnly}>Categories of blog.</h1>

      <CategoryHeader />
    </main>
  );
}
