export const toArray = (elements: ContentType[]) => {
  return elements.map((el) => {
    return el.content;
  });
};
