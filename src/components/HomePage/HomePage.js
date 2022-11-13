import React from "react";
import HomePageInput from "./CardDisplay";
import classes from "./HomePage.module.css";

export function HomePage() {
  const cardsTags = [
    "dana1t",
    "jacky1t",
    "pepega1t",
    "saka1t",
    "server1t",
    "souta1t",
  ];

  const DUMMY_DATA = [
    {
      tag: "dana1t",
      code: "test1",
    },
    {
      tag: "pepega1t",
      code: "test2",
    },
    {
      tag: "dana1t",
      code: "test3",
    },
    {
      tag: "dana1t",
      code: "test4",
    },
    {
      tag: "pepega1t",
      code: "test5",
    },
    {
      tag: "jacky1t",
      code: "test6",
    },
    {
      tag: "jacky1t",
      code: "test7",
    },
    {
      tag: "souta1t",
      code: "test8",
    },
    {
      tag: "souta1t",
      code: "test9",
    },
  ];

  const cardDisplay = cardsTags.map((tag) => {
    const cardsOwned = DUMMY_DATA.filter((card) => card.tag === tag);

    return <HomePageInput id={tag} cardTag={tag} cardData={cardsOwned} />;
  });

  return (
    <div className={classes["home-page"]}>
      <div className={classes["main-cards"]}>
        <p>Enter all 1 ticket cards here:</p>
        <div class="input-group mb-3">
          <button
            class="btn btn-light btn-outline-secondary"
            type="button"
            id="button-addon1"
          >
            Upload
          </button>
          <input
            type="file"
            class="form-control"
            // placeholder=""
            // aria-label="Example text with button addon"
            // aria-describedby="button-addon1"
          />
        </div>
      </div>
      {cardDisplay}
    </div>
  );
}
