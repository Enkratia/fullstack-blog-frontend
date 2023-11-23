type PostType = {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  imageUrl: string;
  tags: string[];
  isFeatured: boolean;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
};

type AuthorsListLinksType = [
  Record<"facebook", string | null>,
  Record<"twitter", string | null>,
  Record<"instagram", string | null>,
  Record<"linkedin", string | null>,
];

type AuthorsListItemType = {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  profession: string;
  company: string;
  authorLinks: AuthorsListLinksType;
};
