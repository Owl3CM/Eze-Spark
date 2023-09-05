import React from "react";
import { PopupMe } from "../../lib";

const PopupExample = () => {
  return (
    <div className="col" style={{ margin: "auto" }}>
      <p
        className="button"
        onClick={() => {
          PopupMe(<PopupChild title={"Hello World"} />);
        }}>
        Open Popup
      </p>
    </div>
  );
};

export default PopupExample;

const PopupChild = ({ title }: any) => {
  return (
    <div className="col" style={{ padding: 30 }}>
      <p className="text-light">passed title</p>
      <p className="text-red"> {title} </p>
    </div>
  );
};
