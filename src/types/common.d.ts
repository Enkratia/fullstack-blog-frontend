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
  user: UserType;
};

// **
// type UserLinksType = [
//   Record<"facebook", string>,
//   Record<"twitter", string>,
//   Record<"instagram", string>,
//   Record<"linkedin", string>,
// ];

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
