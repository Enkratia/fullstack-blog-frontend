const baseUrl = "http://localhost:3001/api";

const fetchApi = async (query: string) => {
  try {
    const response = await fetch(`${baseUrl}/${query}`, {
      next: { tags: [query] },
    });
    const data = await response.json();

    if (!response.ok) {
      return { isError: true };
    }

    return { isError: false, data };
  } catch (error) {
    return { isError: true };
  }
};

// Common
export const fetchCategoryHeaderQuery = async () => {
  const res = await fetchApi("category-description");
  return { isError: res.isError, data: res.data as CategoryDescription[] };
};

export const fetchJoinQuery = async () => {
  const res = await fetchApi("join");
  return { isError: res.isError, data: res.data[0] as JoinType };
};

// HomePage
export const fetchUsMissionQuery = async () => {
  const res = await fetchApi("us-mission");
  return { isError: res.isError, data: res.data[0] as UsMissionType };
};

export const fetchWhyWeStartedQuery = async () => {
  const res = await fetchApi("why-we-started");
  return { isError: res.isError, data: res.data[0] as WhyWeStartedType };
};

export const fetchTestimonialStaticQuery = async () => {
  const res = await fetchApi("testimonial-static");
  return { isError: res.isError, data: res.data[0] as TestimonialStaticType };
};

// AboutUsPage
export const fetchWhyThisBlogQuery = async () => {
  const res = await fetchApi("why-this-blog");
  return { isError: res.isError, data: res.data[0] as WhyThisBlogType };
};

export const fetchKnowMoreQuery = async () => {
  const res = await fetchApi("know-more");
  return { isError: res.isError, data: res.data[0] as KnowMoreType };
};

// ContactUsPage
export const fetchContactUsQuery = async () => {
  const res = await fetchApi("contact-us");
  return { isError: res.isError, data: res.data[0] as ContactUsType };
};

// PostPage
export const fetchPostByIdQuery = async (id: number) => {
  const res = await fetchApi(`posts/${id}`);
  return { isError: res.isError, data: res.data as PostType };
};

// Account
// ProfilePage
export const fetchUserByIdQuery = async (id: number) => {
  const res = await fetchApi(`users/${id}`);
  return { isError: res.isError, data: res.data as UserType };
};
