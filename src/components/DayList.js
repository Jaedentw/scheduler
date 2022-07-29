import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  let mappedDays = props.days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === props.value}
        setDay={props.onChange}
      />
    )
  })

  return (
    <ul>
      {mappedDays}
    </ul>
  );
}