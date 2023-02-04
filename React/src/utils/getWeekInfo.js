import dayjs from "dayjs";

/**
 *
 * @param {Date} date Any day from the week
 * @returns {Array[Object]} Array that contains info about each day of the week
 */
export async function getWeekInfo(date) {
  // Input date as dayjsObject
  const dayJsDate = dayjs(date);

  // Integer[0-6] -> 0 - Monday ; 6 - Sunday
  let currentDayOfTheWeek = (() => {
    if (dayJsDate.day() - 1 < 0) {
      return 6;
    } else {
      return dayJsDate.day() - 1;
    }
  })();

  // dayjsObject
  const firstDayOfTheWeek = (() => {
    return dayJsDate.subtract(currentDayOfTheWeek, "day");
  })();
  // dayjsObject
  const lastDayOfTheWeek = dayjs(firstDayOfTheWeek).add(6, "day");

  const from = firstDayOfTheWeek.format().slice(0, 10);
  const to = lastDayOfTheWeek.format().slice(0, 10);

  return new Promise((resolve, reject) => {
    // Fetches array that contains all examinations for the week.
    fetch(`http://localhost:5000/examinations/getInfoByDate?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((dbRes) => {
        // Creates array that stores 7 Objects -> one for each day. (0 - Monday, 6 - Sunday)
        const weekArray = new Array(7).fill(null).map((e, i) => {
          return {
            date: dayjs(firstDayOfTheWeek).add(i, "day"),
            examinations: [],
            dayNumber: i,
          };
        });

        // Populates weekArray with fetched examinations.
        // ToDo: Optimize sorting
        weekArray.forEach((day, i) => {
          day.examinations = dbRes.filter((el, k) => {
            return dayjs(el.examinationDate).isSame(day.date, "day");
          });
        });

        resolve(weekArray);
      });
  });
}
