import { monthOptions } from "../customFunctions";

export const formatDate3 = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", monthOptions).format(newDate);

  const formattedDate = `${month.slice(0, 3)} ${day}, ${year}`;

  return formattedDate;
};
