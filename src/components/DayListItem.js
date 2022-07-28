import React from "react";
import "./compStyles/DayListItem.scss"
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

  const {name, spots, selected} = props;

  let dayClasses = classNames('day-list__item', {
    "day-list__item--selected": selected,
    "day-list__item--full" : !spots
  })

  return (
    <li 
      onClick={() => props.setDay(name)}
      className={dayClasses}
    >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}