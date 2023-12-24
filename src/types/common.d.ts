type PostType = {
  id: number;
  title: string;
  category: string;
  contentJson: string;
  contentText: string;
  imageUrl: string;
  tags: string[];
  user: UserType;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserLinksType = Record<"facebook" | "twitter" | "instagram" | "linkedin", string>;

type UserType = {
  id: number;
  email: string;
  password?: string;
  imageUrl: string;
  fullname: string;
  profession: string;
  company: string;
  representation: string;
  userLinks: UserLinksType;
  posts?: PostType[];
};

// **
type CategoryDescription = {
  description: string;
};

// **
type JoinType = {
  title: string;
  description: string;
};

// **
type CategoriesNames = ["startup", "business", "economy", "technology"];
