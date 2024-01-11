type MonthOptionsType = {
  month: "long";
};

const monthOptions: MonthOptionsType = {
  month: "long",
};

export const formatDate2 = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", monthOptions).format(newDate);

  const formattedDate = `${day}th ${month} ${year}`;

  return formattedDate;
};
