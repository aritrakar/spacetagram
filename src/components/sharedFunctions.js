/**
 *
 * @param {Date} current
 * @param {Number} days
 * @returns current + days
 */
export const addDays = (current, days) => {
  let date = new Date(current.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns The difference in days between date1 and date2.
 */
export const datediff = (date1, date2) => {
  return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
};

/**
 *
 * @param {Date} date Formats the date.
 * @returns Date formatted as YYYY-MM-DD with strings padded with 0s when required.
 */
export const formatDate = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
