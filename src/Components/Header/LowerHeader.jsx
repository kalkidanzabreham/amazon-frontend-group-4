import React from 'react'
import classes from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
         <GiHamburgerMenu/>
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader