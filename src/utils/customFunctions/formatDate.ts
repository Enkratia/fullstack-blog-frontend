type DateOptionsType = {
  year: "numeric";
  month: "long";
  day: "numeric";
};

export const dateOptions: DateOptionsType = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (date: string) => {
  const dateParsed = Date.parse(date);

  return new Intl.DateTimeFormat("en-US", dateOptions).format(dateParsed);
};
