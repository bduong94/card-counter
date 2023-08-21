import React from "react";
import classes from "./CardCodesUploader.module.css";

export default function CardCodesUploader({ name, fileUploadHandler }) {
  return (
    <>
      <p>{name[0].toUpperCase() + name.slice(1)} week:</p>
      <input
        className={`form-control ${classes["uploader"]}`}
        type="file"
        onChange={fileUploadHandler}
      />
    </>
  );
}
