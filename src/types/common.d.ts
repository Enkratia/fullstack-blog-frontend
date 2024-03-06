// **
type ToastTypesType = ["warning", "error", "info", "success", undefined];
type ToastTypeType = ToastTypesType[number];

// **
type AdminRoutesType = ["/dashboard"];
type ProtectedRoutesType = ["/account", "/edit-post"];
type ModalPageNamesType = ["/auth/signin", "/auth/signup", "/auth/forgot"];
type ModalPagesType = { [key in ModalPageNamesType[number]]: React.ReactNode };

// **
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
type CategoryNames = ["startup", "business", "economy", "technology"];

type CategoryDescriptionIdType = {
  id: number;
};

type CategoryDescriptionContentType = {
  [key in CategoryNames[number]]: string;
};

type CategoryDescriptionType = CategoryDescriptionIdType & CategoryDescriptionContentType;

// **
type JoinType = {
  title: string;
  description: string;
};

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
