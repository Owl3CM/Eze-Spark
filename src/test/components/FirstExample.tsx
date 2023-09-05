import React from "react";
import { PopupMe } from "../../lib";

const PopupExample = () => {
  return (
    <div className="test-container">
      <p
        className="test-button"
        onClick={({ target }) =>
          PopupMe(<PopupChild />, {
            target,
          })
        }>
        Open Popup
      </p>
    </div>
  );
};

export default PopupExample;

const PopupChild = () => {
  return (
    <div className="col" style={{ padding: 30 }}>
      <p className="text-red"> Hello World </p>
    </div>
  );
};
