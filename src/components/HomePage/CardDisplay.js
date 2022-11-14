import React from "react";
import classes from "./CardDisplay.module.css";
import ToggleButton from "./ToggleButton";

export default function HomePageInput({
  cardTag,
  cardDataPreviousWeek,
  cardDataThisWeek,
}) {
  const className = `card-field`;

  const owner = cardTag
    ? cardTag === "1t"
      ? "Brian"
      : cardTag[0].toUpperCase() + cardTag.slice(1, -2)
    : null;

  console.log(cardDataPreviousWeek);
  let cardCodesPreviousWeek = "";
  let cardCodesThisWeek = "";
  const cardCountPreviousWeek = cardDataPreviousWeek
    ? cardDataPreviousWeek.length
    : 0;
  const cardCountThisWeek = cardDataThisWeek ? cardDataThisWeek.length : 0;

  if (cardCountPreviousWeek > 0) {
    for (const card of cardDataPreviousWeek) {
      cardCodesPreviousWeek += card.code + " ";
    }
  }

  if (cardCountThisWeek > 0) {
    for (const card of cardDataThisWeek) {
      cardCodesThisWeek += card.code + " ";
    }
  }

  const allCardCodesPreviousWeek =
    cardCountPreviousWeek > 0
      ? `${cardCodesPreviousWeek.trim()}`
      : `No cards from user`;

  const allCardCodesThisWeek =
    cardCountThisWeek > 0
      ? `${cardCodesThisWeek.trim()}`
      : `No cards from user`;

  return (
    <div className={classes[className]}>
      <p>Cards from {owner}</p>
      <p>Total cards previous week: {cardCountPreviousWeek}</p>
      <p>Total cards this week: {cardCountThisWeek}</p>
      <div className={classes["card-codes"]}>
        Card codes previous week:
        <ToggleButton codes={allCardCodesPreviousWeek} />
      </div>
      <div className={classes["card-codes"]}>
        Card codes this week:
        <ToggleButton codes={allCardCodesThisWeek} />
      </div>
    </div>
  );
}
