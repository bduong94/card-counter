import React from "react";
import classes from "./AllCards.module.css";
import ToggleButton from "./ToggleButton";

export default function AllCards({ allCardData }) {
  const className = `card-field`;
  let allCardCodes = "";
  const allCardCount = allCardData.length;

  for (const card of allCardData) {
    allCardCodes += card.code + " ";
  }

  const displayAllCards =
    allCardCount > 0 ? `${allCardCodes.trim()}` : `No cards from user`;

  return (
    <div className={classes[className]}>
      <p>All Cards</p>
      <p>Total cards count: {allCardCount}</p>
      <div className={classes["card-codes"]}>
        Card codes this week:
        <ToggleButton codes={displayAllCards} />
      </div>
    </div>
  );
}
