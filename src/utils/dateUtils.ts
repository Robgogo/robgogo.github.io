export const readableDateString = (date: Date) => {
  const [_day, month, _date, year] = date.toDateString().split(" ");
  return `${month}, ${year}`;
};

export const shortDate = (date: Date) => {
  const [_day, month, _date, year] = date.toDateString().split(" ");
  return `${month} ${year}`;
};

export const dateRange = (from: Date, to: Date | "now") =>
  `${shortDate(from)} — ${to === "now" ? "present" : shortDate(to)}`;
