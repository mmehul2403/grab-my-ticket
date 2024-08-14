// components/FormatDateFromTimestamp.js
import React from "react";

const FormatDateFromTimestamp = ({ timestamp }) => {
  const dateObject = new Date(parseInt(timestamp, 10));
  if (isNaN(dateObject.getTime())) {
    return <span>Invalid date</span>;
  }
  return <span>{dateObject.toLocaleDateString()}</span>;
};

export default FormatDateFromTimestamp;
