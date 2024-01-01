type ContentType = {
  id: number;
  content: string;
};

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

interface IObjKeys {
  [key: string]: string;
}

type userLinksName = "facebook" | "twitter" | "instagram" | "linkedin";

interface UserLinksType extends IObjKeys {
  [key: userLinksName]: string;
}

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
