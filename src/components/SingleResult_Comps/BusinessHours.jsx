import React from "react";

//returns BusinessHours component with formatting 
export default function BusinessHours(props) {
  const {business_hours} = props;

  if (typeof business_hours === "string") {
    const parsedHours = JSON.parse(business_hours);
    const listItems = parsedHours.map((day) =>
    <li key={day}>
      {day}
    </li>
    );

    return (
      <ul>{listItems}</ul>
    );
  }

  const listItems = business_hours.map((day) =>
    <li key={day}>
      {day}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}