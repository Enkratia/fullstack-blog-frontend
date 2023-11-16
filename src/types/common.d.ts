// Authors
// enum AuthorsLinksEnum {
//   FACEBOOK = "facebook",
//   TWITTER = "twitter",
//   INSTAGRAM = "instagram",
//   LINKEDIN = "linkedin",
// }

// type AuthorsLinksEnumKey = keyof typeof AuthorsLinksEnum;

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
