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

// HomePage
export const fetchUsMissionQuery = async () => {
  const res = await fetchApi("us-mission");
  return { isError: res.isError, data: res.data[0] as UsMissionType };
};
