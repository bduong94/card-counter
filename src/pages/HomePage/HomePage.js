import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils";
import { useDispatch } from "react-redux";
import { downloadCards } from "../../store/slice/CardSlice";
import classes from "./HomePage.module.css";
import CardCodesUploader from "../../components/CardCodesUploader/CardCodesUploader";
import { Button } from "@mui/material";
import { excelFileReader } from "../../hooks/excelReader.js";
export function HomePage() {
  const [fileOne, setFileOne] = useState();
  const [fileTwo, setFileTwo] = useState();
  const [filesLoading, setFilesLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingDisplay = (
    <div className={`${classes["loading-icon"]}`}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
      </div>
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
    navigate(ROUTES.SUMMARY);
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
        {filesLoading ? loadingDisplay : null}
      </div>
    </div>
  );
}
