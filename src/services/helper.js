import { isEmpty } from "lodash";
export function getDateString(date, time = false) {
  // Input date-time string in ISO 8601 format
  const isoDateTimeString = date;

  // Create a Date object from the ISO 8601 string
  const dateTime = new Date(isoDateTimeString);

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Months are zero-based
  const year = dateTime.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
  let returnString = formattedDate;
  if (time === true) {
    const time = dateTime.toLocaleTimeString();
    returnString += " " + time;
  }
  return returnString;

  // // Format the date portion
  // const dateOptions = { year: "numeric", month: "short", day: "2-digit" };
  // const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);

  // // Format the time portion
  // const timeOptions = {
  //   hour: "numeric",
  //   minute: "2-digit",
  //   hour12: true,
  // };
  // const formattedTime = dateTime.toLocaleTimeString("en-US", timeOptions);

  // // Combine date and time
  // return `${formattedDate} ${formattedTime}`;
}

export const maskString = (input) => {
  if (isEmpty(input)) {
    return "NULL";
  }
  var last4 = input.substring(input.length - 4);

  const mask = input.substring(0, input.length - 4).replace(/\d/g, "*");
  return mask + last4;
};

export const getUsersCount = (users, active = true) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 30);
  let count = users.filter((user) => {
    let foundUser = user.transactions.some((transaction) => {
      const transactionDate = new Date(transaction.created_At);
      return transactionDate >= currentDate;
    });
    return active ? foundUser : !foundUser;
  });
  return count.length;
};
