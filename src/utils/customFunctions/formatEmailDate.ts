type TimeTodayType = {
  hour: "2-digit";
  minute: "2-digit";
};

const timeTodayOptions: TimeTodayType = {
  hour: "2-digit",
  minute: "2-digit",
};

// **
type DateThisYearType = {
  day: "numeric";
  month: "short";
};

const dateThisYearOptions: DateThisYearType = {
  day: "numeric",
  month: "short",
};

// **
type DateLastYearsType = {
  day: "2-digit";
  month: "2-digit";
  year: "numeric";
};

const dateLastYears: DateLastYearsType = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

export const formatEmailDate = (inputDatetime: string) => {
  // const inputDatetime = "2024-02-11T15:52:19.418Z";
  const dateInput = new Date(inputDatetime);
  const dateNow = new Date();

  if (+dateNow - +dateInput < 86400000) {
    return new Intl.DateTimeFormat("ru-RU", timeTodayOptions).format(dateInput);
  }

  const yearNow = dateNow.getFullYear();
  const yearInput = dateInput.getFullYear();

  if (yearNow === yearInput) {
    return new Intl.DateTimeFormat("en-US", dateThisYearOptions).format(dateInput);
  }

  if (yearNow !== yearInput) {
    return new Intl.DateTimeFormat("en-US", dateLastYears).format(dateInput).replace(/\//g, ".");
  }
};
