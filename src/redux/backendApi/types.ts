export type UpdateUserType = {
  id: string;
  body: FormData;
};

// **
export type GetUsersType = {
  data: UserType[];
  totalCount: number;
};

// **
export type ActivateUserType = Record<"token", string>;
// **
export type GetPostsType = {
  data: PostType[];
  totalCount: number;
};

// **
export type GetTagsType = {
  data: ContentType[];
  totalCount: number;
};
