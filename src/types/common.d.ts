type ContentType = {
  id: number;
  content: string;
};

type PostType = {
  id: string;
  title: string;
  category: string;
  contentJson: string;
  contentText: string;
  imageUrl: string;
  tags: ContentType[];
  user: UserType;
  isFeatured: boolean;
  views: number;
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
  id: string;
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
type CategoryNames = "business" | "startup" | "economy" | "technology";

interface CategoryDescription extends IObjKeys {
  [key: CategoryNames]: string;
}

// **
type JoinType = {
  title: string;
  description: string;
};

// **
type CategoriesNames = ["startup", "business", "economy", "technology"];

// **
interface SocialLinksType extends IObjKeys {
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

type FooterBottomType = {
  address: string;
  phone: string;
  email: string;
  socialLinks: SocialLinksType;
};
