export type UpdateUserType = {
  id: string;
  body: FormData;
};

// **
export type UpdatePostType = {
  id: string;
  body: FormData;
};

// **
export type GetUsersType = {
  data: UserType[];
  totalCount: number;
};

// **
export type ResetPasswordType = {
  token: string;
  body: FormData;
};

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

// **
export type GetContactUsMessagesType = {
  data: ContactUsMessageType[];
  totalCount: number;
};

// **
export type GetFeaturedInType = {
  data: FeaturedCompanyType[];
  totalCount: number;
};

// **
export type UpdateBrandType = {
  id: number;
  body: FormData;
};

// **
export type UpdateTestimonialType = {
  id: number;
  body: FormData;
};

// **
export type UpdateQueryType = {
  id: number;
  body: FormData;
};

// **
export type GetTestimonialsType = {
  data: TestimonialType[];
  totalCount: number;
};

// **
export type GetContactUsQueriesType = {
  data: ContactUsQueryType[];
  totalCount: number;
};
