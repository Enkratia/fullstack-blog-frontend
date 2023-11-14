// Authors
type AuthorsListTitleType = [
  Record<"facebook", string>,
  Record<"twitter", string>,
  Record<"instagram", string>,
  Record<"linkedin", string>,
];

type AuthorsListItemType = {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  profession: string;
  company: string;
  authorLinks: AuthorsListTitleType;
};
