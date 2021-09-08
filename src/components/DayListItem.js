import React from "react";

import "components/DayListItem.scss";

import classnames from 'classnames'; 

export default function DayListItem(props) {

  const formatSpots = () => {
    
    let spotText;
    if(props.spots === 0) {
      spotText = "no spots remaining";
    } else if (props.spots ===1) {
      spotText = "1 spot remaining";
    } else {
      spotText = props.spots + " spots remaining";
    }
      return spotText;

  }   

  const buttonClass1 = classnames("day-list__item", {
    "day-list__item--selected": props.selected, 
    "day-list__item--full": props.spots === 0
});

  return (
    <li className = {buttonClass1} onClick={props.setDay} data-testid ="day" >
    <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
  
}


