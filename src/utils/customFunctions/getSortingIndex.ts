export const getSortingIndex = (sortObj: any, sortCode: any) => {
  const idx = [...sortObj].findIndex(({ code }) => code === sortCode);
  return idx > 0 ? idx : 0;
};
