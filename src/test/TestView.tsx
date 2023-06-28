import React from "react";
import { Popup, PopupMe, PrintMe } from "../lib";

const TestPopup = () => {
  PopupMe({
    Component: Example,
    componentProps: {
      text: "Hello",
      tile: "World",
    },
    removeOnOutClick: true,
    overlay: true,
    // placement: "top",
  });
};
const TestPrint = () => {
  PrintMe({
    Component: Example,
    componentProps: {
      text: "Hello",
      tile: "World",
    },
    // placement: "top",
  });
};
const TestPopupWithTarget = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const id = "with-target";
  PopupMe({
    id,
    Component: Example,
    componentProps: {
      text: "with target",
      tile: "ok",
    },
    target: e.currentTarget,
    offset: { x: 10, y: 10 },
    placement: "list",
    // onRemoved: () => console.log("removed"),
  });
};

const TestView = () => {
  return (
    <div>
      <div className="row gap-x p-l">
        <div onClick={TestPopup} className="button m-auto">
          Test
        </div>
        <div onClick={TestPrint} className="button m-auto">
          TestPrint
        </div>
        <div onClick={TestPopupWithTarget} className="button m-auto">
          Test with target
        </div>
      </div>
    </div>
  );
};

export default TestView;

interface ExampleProps {
  text: string;
  tile: string;
}

const Example = ({ text, tile }: ExampleProps) => {
  return (
    <div className="p-l rounded-2x">
      <h1>Example</h1>
      <h2>{text}</h2>
      <h2>{tile}</h2>
    </div>
  );
};
