import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

const formatSpots = (value) => {
  if(value > 1) {
    return `${value} spots remaining`
  }
  if(value === 1) {
    return '1 spot remaining'
  }
  if(value < 1) {
    return 'no spots remaining'
  }
}

export default function DayListItem(props) {

  let dayClasses = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full" : !props.spots
  })

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={dayClasses}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}