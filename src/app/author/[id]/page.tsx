import { fetchUserByIdQuery } from "../../../fetchApi/fetchApi";

import { AuthorHeader, AuthorPosts } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export async function generateMetadata({ params: { id } }: AuthorPageProps) {
  const { data: user } = await fetchUserByIdQuery(id);

  return {
    title: user?.fullname || "Author",
    description: `Page of ${user?.fullname}` || "Author's page",
  };
}

type AuthorPageProps = {
  params: {
    id: string;
  };
};

const AuthorPage: React.FC<AuthorPageProps> = ({ params: { id } }) => {
  return (
    <main>
      <h1 className={cs.srOnly}>Author&apos;s page</h1>
      <AuthorHeader id={id} />
      <AuthorPosts />
    </main>
  );
};

export default AuthorPage;
