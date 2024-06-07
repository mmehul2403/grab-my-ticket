import { format } from "date-fns";

const FormatDate = (date, dateFormat) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date");
    }
    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error("Invalid date value:", error);
    return "Invalid date";
  }
};

export default FormatDate;
