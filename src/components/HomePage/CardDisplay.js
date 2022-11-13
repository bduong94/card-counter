import React from "react";
import classes from "./CardDisplay.module.css";

export default function HomePageInput({ cardTag, cardData }) {
  const className = `card-field`;
  const owner = cardTag[0].toUpperCase() + cardTag.slice(1, -2);
  let cardCodes = "";
  const cardCount = cardData.length;

  return (
    <div className={classes[className]}>
      <p>Cards from: {owner}</p>
      <p>Total cards: {cardCount}</p>
      {/* <p>Enter your cards:</p>
      <div class="input-group mb-3">
        <button
          class="btn btn-light btn-outline-secondary"
          type="button"
          id="button-addon1"
        >
          Enter
        </button>
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
        />
      </div> */}
    </div>
  );
}
