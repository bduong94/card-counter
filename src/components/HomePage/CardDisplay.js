import React from "react";
import classes from "./CardDisplay.module.css";

export default function HomePageInput({
  cardTag,
  cardDataPreviousWeek,
  cardDataThisWeek,
}) {
  const className = `card-field`;
  const owner =
    cardTag === "1t"
      ? "Brian"
      : cardTag[0].toUpperCase() + cardTag.slice(1, -2);
  let cardCodesPreviousWeek = "";
  let cardCodesThisWeek = "";
  const cardCountPreviousWeek = cardDataPreviousWeek.length;
  const cardCountThisWeek = cardDataThisWeek.length;

  for (const card of cardDataPreviousWeek) {
    cardCodesPreviousWeek += card.code + " ";
  }

  for (const card of cardDataThisWeek) {
    cardCodesThisWeek += card.code + " ";
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
      <p>Card codes previous week: {allCardCodesPreviousWeek}</p>
      <p>Card codes this week: {allCardCodesThisWeek}</p>
    </div>
  );
}
