import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  let {days, value, onChange} = props;

  let mappedDays = days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === value}
        setDay={onChange}
      />
    )
  })

  return (
    <ul>
      {mappedDays}
    </ul>
  );
}