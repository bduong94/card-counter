import React, { useState, useEffect } from "react";
import HomePageInput from "./CardDisplay";
import classes from "./HomePage.module.css";
import { CardCodesUploader } from "./CardCodesUploader";
import readXlsxFile from "read-excel-file";

export function HomePage() {
  const [fileOne, setFileOne] = useState();
  const [fileTwo, setFileTwo] = useState();

  const cardsTags = [
    "spare1t",
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
    return (
      <HomePageInput key={tag} id={tag} cardTag={tag} cardData={cardsOwned} />
    );
  });

  async function excelFileReader(file) {
    let fileContent;
    await readXlsxFile(file).then((res) => {
      fileContent = res;
    });

    return fileContent;
  }

  async function fileUploadHandler() {
    const acceptableFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    let filesAcceptable;

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

    const excelContentFileOne = await excelFileReader(fileOne);
    const excelContentFileTwo = await excelFileReader(fileTwo);

    console.log(excelContentFileOne);
    console.log(excelContentFileTwo);
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
        {/* <input
          type="file"
          class="form-control"
          onChange={fileUploaderOneHandler}
        />
        <input
          type="file"
          class="form-control"
          onChange={fileUploaderTwoHandler}
        /> */}
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
      {cardDisplay}
    </div>
  );
}
