import React from "react";
import { PopupMe } from "../../lib";

const PopupExample = () => {
  const [title, setTitle] = React.useState("Hello World !");
  return (
    <div className="col" style={{ margin: "auto" }}>
      <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={({ target }) => target.select()} />
      <p
        className="button"
        onClick={() => {
          PopupMe({
            Component: PopupChild,
            componentProps: { title },
            animation: "auto",
            placement: "auto",
          });
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
