import dayjs from "dayjs";

export function getMonthInfo(month = dayjs().month()) {
  const year = dayjs().year();

  // Gets the value[0-6](0-Monday, 6-Sunday), which represents the name of the first day of the month.
  const firstDayOfTheMonth = (() => {
    if (dayjs(new Date(year, month, 1)).day() - 1 < 0) {
      return 6;
    } else {
      return dayjs(new Date(year, month, 1)).day() - 1;
    }
  })();

  // This value is used to generate the day of the month.
  // But also we subtract firstDayOfTheMonth to find how much days from the previous
  // month should be displayed on the first week of the calendar.
  // Explanation: new Day(2023, 2, -2) returns the date 2023.01.30 (2 days before first day of the month)
  let currentDay = 1 - firstDayOfTheMonth;

  // Creates monthMatrix[[]] - Level 1 - week, Level 2 - day
  const daysMatrix = new Array(6).fill([]).map((week) => {
    return new Array(7).fill(null).map((d) => {
      const day = dayjs(new Date(year, month, currentDay));
      currentDay++;
      return day;
    });
  });

  return daysMatrix;
}
