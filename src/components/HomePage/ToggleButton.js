import React, { useState } from "react";
import classes from "./ToggleButton.module.css";

export default function ToggleButton({ codes }) {
  const [toggleOn, setToggleOn] = useState(false);

  const toggleHandler = () => {
    setToggleOn((previous) => !previous);
  };

  return (
    <div className={toggleOn ? "border border-dark" : ""}>
      {toggleOn ? (
        <div className={classes["show-code"]}>
          <button
            type="button"
            className="btn btn-light"
            onClick={toggleHandler}
          >
            Hide
          </button>
          <p>{codes}</p>
        </div>
      ) : (
        <button type="button" className="btn btn-light" onClick={toggleHandler}>
          ...
        </button>
      )}
    </div>
  );
}
