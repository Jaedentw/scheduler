import React from "react"
import DayListItem from "components/DayListItem";

export default function DayList1(props) {

  let mappedDays = props.days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === props.day}
        setDay={props.setDay}
      />
    )
  })

  return (
    <ul>
      {mappedDays}
    </ul>
  );
}