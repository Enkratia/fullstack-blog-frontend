// **
export type UpdateUserType = {
  id: number;
  body: FormData;
};

// **
export type GetPostsType = {
  data: PostType[];
  totalCount: number;
};
