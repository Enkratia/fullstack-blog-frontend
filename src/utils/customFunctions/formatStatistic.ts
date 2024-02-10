export const formatStatistic = (count: number) => {
  let formattedCount = "";

  if (count > 999999) {
    formattedCount = ~~(count / 1000 / 1000) + "K+";
    return formattedCount;
  }

  if (count > 999) {
    formattedCount = ~~(count / 1000) + "K+";
    return formattedCount;
  }

  formattedCount = count + "+";
  return formattedCount;
};
