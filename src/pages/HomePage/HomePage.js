import React, { useEffect, useState } from "react";
import HomePageInput from "../../components/HomePage/CardDisplay";
import AllCards from "../../components/HomePage/AllCards.js";
import { useSelector, useDispatch } from "react-redux";
import { downloadCards } from "../../store/slice/CardSlice";
import classes from "./HomePage.module.css";
import { CardCodesUploader } from "../../components/HomePage/CardCodesUploader";
import { Button } from "@mui/material";
import { excelFileReader } from "../../hooks/excelReader.js";

export function HomePage() {
  const [fileOne, setFileOne] = useState();
  const [fileTwo, setFileTwo] = useState();
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const { filteredCardsOne, filteredCardsTwo, cardsTags } = useSelector(
    (state) => state.cards
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (filteredCardsOne.length > 0 && filteredCardsTwo.length > 0) {
      setFilesUploaded(true);
    }
  }, [filteredCardsOne, filteredCardsTwo, filesUploaded]);

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

    dispatch(downloadCards({ excelContentFileOne, excelContentFileTwo }));
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
          <Button variant="contained" onClick={fileUploadHandler}>
            Upload
          </Button>
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
