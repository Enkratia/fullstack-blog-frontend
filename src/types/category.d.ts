// **
type CategoryHeaderIdType = {
  id: number;
};

type CategoryHeaderContentType = {
  [key in CategoryNames[number]]: string;
};

type CategoryHeaderType = CategoryHeaderIdType & CategoryHeaderContentType;

// **
type CategoryTags = string[];
