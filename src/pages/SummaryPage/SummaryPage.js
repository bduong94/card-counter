import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./SummaryPage.module.css";
import HomePageInput from "../../components/CardDisplay/CardDisplay";
import AllCards from "../../components/AllCards/AllCards";

export function SummaryPage() {
  const [filesUploaded, setFilesUploaded] = useState(false);
  const { filteredCardsOne, filteredCardsTwo, cardsTags } = useSelector(
    (state) => state.cards
  );

  const cardDisplay =
    filteredCardsOne && filteredCardsTwo
      ? cardsTags.map((tag) => {
          const cardsOwnedPreviousWeek = filteredCardsOne.filter(
            (card) => card.tag === tag
          );
          const cardsOwnedThisWeek = filteredCardsTwo.filter(
            (card) => card.tag === tag
          );
          return (
            <HomePageInput
              key={tag}
              id={tag}
              cardTag={tag}
              cardDataPreviousWeek={cardsOwnedPreviousWeek}
              cardDataThisWeek={cardsOwnedThisWeek}
            />
          );
        })
      : null;

  const noCardsToDisplay = (
    <div>
      <p>Files have not been uploaded yet</p>
    </div>
  );

  useEffect(() => {
    if (filteredCardsOne.length > 0 && filteredCardsTwo.length > 0) {
      setFilesUploaded(true);
    }
  }, [filteredCardsOne, filteredCardsTwo, filesUploaded]);

  return (
    <div className={classes["summary-page"]}>
      <div className={classes["card-container"]}>
        {filesUploaded ? (
          <>
            <AllCards allCardData={filteredCardsTwo} />
            {cardDisplay}
          </>
        ) : (
          noCardsToDisplay
        )}
      </div>
    </div>
  );
}
