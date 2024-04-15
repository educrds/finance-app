export function getYearAndMonth(date) {
  date = new Date(date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return { year, month };
}