import React, { useState } from "react";
import HomePageInput from "./CardDisplay";
import AllCards from "./AllCards.js";
import classes from "./HomePage.module.css";
import { CardCodesUploader } from "./CardCodesUploader";
import {
  excelFileReader,
  searchColumnIndex,
  filterCards,
} from "../../hooks/excelReader.js";

export function HomePage() {
  const [fileOne, setFileOne] = useState();
  const [fileTwo, setFileTwo] = useState();
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [filteredCardsOne, setFilteredCardsOne] = useState([]);
  const [filteredCardsTwo, setFilteredCardsTwo] = useState([]);

  const cardsTags = [
    "1t",
    "spare1t",
    "dana1t",
    "jacky1t",
    "pepega1t",
    "saka1t",
    "server1t",
    "souta1t",
    "eti1t"
  ];

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

  const loadingDisplay = (
    <div className={`${classes["loading-icon"]}`}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );

  const noCardsToDisplay = (
    <div>
      <p>Files have not been uploaded yet</p>
    </div>
  );

  async function fileUploadHandler() {
    const acceptableFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    let filesAcceptable;

    setFilesLoading(false);

    if (!fileOne) {
      return console.log("A file is missing");
    }

    if (!fileTwo) {
      return console.log("A file is missing");
    }

    if (fileOne && fileTwo) {
      filesAcceptable =
        acceptableFileTypes.includes(fileOne.type) &&
        acceptableFileTypes.includes(fileTwo.type);
    }

    if (!filesAcceptable) {
      return console.log("File format is not accepted.");
    }

    setFilesLoading(true);

    const excelContentFileOne = await excelFileReader(fileOne);
    const excelContentFileTwo = await excelFileReader(fileTwo);

    setFilesLoading(false);

    const fileOneColumnIndexes = {
      code: searchColumnIndex(excelContentFileOne[0], "code"),
      tag: searchColumnIndex(excelContentFileOne[0], "tag"),
      wishlists: searchColumnIndex(excelContentFileOne[0], "wishlists"),
    };

    const fileTwoColumnIndexes = {
      code: searchColumnIndex(excelContentFileTwo[0], "code"),
      tag: searchColumnIndex(excelContentFileTwo[0], "tag"),
      wishlists: searchColumnIndex(excelContentFileTwo[0], "wishlists"),
    };

    const fileOneFilteredCards = filterCards(
      excelContentFileOne,
      cardsTags,
      fileOneColumnIndexes
    );

    const fileTwoFilteredCards = filterCards(
      excelContentFileTwo,
      cardsTags,
      fileTwoColumnIndexes
    );

    setFilesUploaded(true);
    setFilteredCardsOne(fileOneFilteredCards);
    setFilteredCardsTwo(fileTwoFilteredCards);
  }

  function fileUploaderOneHandler(e) {
    const file = e.target.files[0];
    setFileOne(file);
  }

  function fileUploaderTwoHandler(e) {
    const file = e.target.files[0];
    setFileTwo(file);
  }

  return (
    <div className={classes["home-page"]}>
      <div className={classes["main-cards"]}>
        <p>Upload your files here (Acceptable Formats: .xlsx) : </p>
        <CardCodesUploader
          name="previous"
          fileUploadHandler={fileUploaderOneHandler}
        />
        <CardCodesUploader
          name="this"
          fileUploadHandler={fileUploaderTwoHandler}
        />
        <div className={classes["upload-button"]}>
          <button
            type="button"
            className="btn btn-light"
            onClick={fileUploadHandler}
          >
            Upload
          </button>
        </div>
      </div>
      <div className={classes["card-container"]}>
        {filesLoading ? (
          loadingDisplay
        ) : filesUploaded ? (
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
