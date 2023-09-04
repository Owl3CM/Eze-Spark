import React from "react";
import { PopupMe } from "../../lib";

const popupFunction = ({ title, target }) => {
  PopupMe({
    Component: PopupChild,
    componentProps: { title },
    animation: "auto",
    placement: "top-left",
    target,
  });
};

const PopupExample = () => {
  const [title, setTitle] = React.useState("Hello World !");
  return (
    <div className="col" style={{ margin: "auto" }}>
      <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={({ target }) => target.select()} />
      <div
        className="button"
        onClick={({ target }) => {
          popupFunction({ title, target });
        }}>
        Open Popup
      </div>
    </div>
  );
};

export default PopupExample;

const PopupChild = ({ title }: any) => {
  return (
    <div className="col min-w-max">
      <p className="text-light">passed title</p>
      <p className="text-red"> {title} </p>
    </div>
  );
};
