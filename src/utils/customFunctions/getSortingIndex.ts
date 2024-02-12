export const getSortingIndex = (sorting: any, sort: any) => {
  const idx = [...sorting].findIndex(({ code }) => code === sort);
  return idx > 0 ? idx : 0;
};
