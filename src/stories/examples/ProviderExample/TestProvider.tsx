import React from "react";
import { Popup, PopupMe } from "../Lib";

const TestProvider = () => {
  return (
    <div className="col-center bg-prim p-l rounded-l m-l gap-2x">
      <h1>TestPopup</h1>
      <button
        className="button bg-lord"
        onClick={({ currentTarget }) => {
          testPopup({ currentTarget, placement: "center" });
        }}
      >
        Center
      </button>
      <button
        className="button bg-lord"
        onClick={({ currentTarget }) => {
          testPopup({ currentTarget, placement: "auto" });
        }}
      >
        auto
      </button>
    </div>
  );
};

export default TestProvider;

const ComponentSample = ({ test }: any) => {
  return (
    <div className="col px-3x gap-x py-l">
      <p>{test}</p>
      <input type="text" className="input" />
      <p className="button" onClick={() => Popup.remove()}>
        Colse
      </p>
    </div>
  );
};

const testPopup = ({ currentTarget, placement }: any) => {
  PopupMe({
    placement,
    offset: 10,
    target: currentTarget,
    Component: ComponentSample,
    componentProps: { test: "testing" },
  });
};
