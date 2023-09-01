import React from "react";
import { Popup, PopupMe, PrintMe } from "../lib";

const TestPopup = () => {
  PopupMe({
    Component: Example,
    componentProps: {
      text: "Hello",
      tile: "World",
    },
    // removeOnOutClick: false,
    placement: "center",
    // containerClass: "bg-red fixed left-0 top-0",
    overlay: false,
  });
};
const TestPopupOverlay = () => {
  PopupMe({
    Component: Example,
    componentProps: {
      text: "Hello",
      tile: "World",
    },
    // placement: "center",
    // removeOnOutClick: false,
    // overlay: true,
    // containerClass: "bg-red fixed left-0 top-0",
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
    placement: "inside",
    // onRemoved: () => console.log("removed"),
    containerClass: "bg-red animation-none",
    childClass: "",
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
const TestView = () => {
  return (
    <div>
      <div className="row gap-x p-l">
        <div onClick={TestPopup} className="button m-auto">
          Test
        </div>
        <div onClick={TestPopupOverlay} className="button m-auto">
          TestPopupOverlay
        </div>
        <div onClick={TestPopupWithTarget} className="button m-auto">
          Test with target
        </div>
        <div onClick={TestPrint} className="button m-auto bg-cyan">
          TestPrint
        </div>
      </div>
    </div>
  );
};

export default TestView;

interface ExampleProps {
  text: string;
  tile: string;
  overlay?: boolean;
}

const Example = ({ text, tile, overlay }: ExampleProps) => {
  return (
    <div className="p-l rounded-2x">
      <h1>Example </h1>
      <h2>{text}</h2>
      <h2>{tile}</h2>
      <h2>{`overlay :${overlay}`}</h2>
    </div>
  );
};
