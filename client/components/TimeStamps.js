import React from "react";

const MyComponent = ({ timestamp }) => {
  const date = new Date(timestamp);

  //"Apr 8, 2023"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div>
      <p className="text-sm">{formattedDate}</p>
      <p className="text-sm">{formattedTime}</p>
    </div>
  );
};

export default MyComponent;
