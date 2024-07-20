import { format } from "date-fns";

const FormatDate = (timestamp, dateFormat) => {
  try {
    const parsedDate = new Date(Number(timestamp));
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }
    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error("Invalid date value:", error);
    return "Invalid date";
  }
};

export default FormatDate;
