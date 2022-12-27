import React, { useState } from "react";
import classes from "./AllCards.module.css";
import ToggleButton from "./ToggleButton";

export default function AllCards({ allCardData }) {
  const [cardsExpanded, setCardsExpanded] = useState(false);

  const className = `card-field`;
  let allCardCodes = "";
  const allCardCount = allCardData.length;

  for (const card of allCardData) {
    allCardCodes += card.code + " ";
  }

  const displayAllCards =
    allCardCount > 0 ? `${allCardCodes.trim()}` : `No cards from user`;

  const cardDisplayClass = cardsExpanded
    ? ""
    : `${classes["card-codes-hidden"]}`;

  return (
    <div className={classes[className]}>
      <p>All Cards</p>
      <p>Total cards count: {allCardCount}</p>
      <div className={cardDisplayClass}>
        <div>Card codes this week:</div>
        <ToggleButton
          codes={displayAllCards}
          toggleAppearance={setCardsExpanded}
        />
      </div>
    </div>
  );
}
