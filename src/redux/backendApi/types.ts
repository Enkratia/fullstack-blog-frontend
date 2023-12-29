// **
export type UpdateUserType = {
  id: number;
  body: FormData;
};

// **
export type GetUsersType = {
  data: UserType[];
  totalCount: number;
};

// **
export type GetPostsType = {
  data: PostType[];
  totalCount: number;
};
