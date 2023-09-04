import React from "react";
import { Popup, PopupMe, PrintMe } from "../lib";

const Center = () => {
  const id = "Center";
  PopupMe({
    id,
    Component: CenterComponent,
    componentProps: { remove: () => Popup.remove(id) },
    placement: "center",
    fadeAnimation: "width-height",
    // removeOnOutClick: false,
    // childClass: "bg-prim p-x ",
    // fadeAnimation: "center",
    // overlay: false,
  });
};
const Bottom = () => {
  const id = "Bottom";
  PopupMe({
    id,
    Component: CenterComponent,
    componentProps: { remove: () => Popup.remove(id) },
    // removeOnOutClick: false,
    childClass: "bg-prim p-x ",
    fadeAnimation: "auto",
    placement: "bottom",
    // overlay: false,
  });
};
const Top = () => {
  const id = "Top";
  PopupMe({
    id,
    Component: ExampleTop,
    componentProps: {
      text: "Hello",
      tile: "World",
      remove: () => Popup.remove(id),
    },
    // removeOnOutClick: false,
    // containerClass: "bg-red fixed left-0 top-0",
    childClass: "bg-prim p-x ",
    // fadeAnimation: "top",
    // overlay: false,
  });
};
const TestPopupOverlay = () => {
  PopupMe({
    id: "test-overlay",
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

const Inside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const id = "Inside";
  PopupMe({
    id,
    Component: Example,
    componentProps: {
      text: "Inside",
      tile: "ok",
    },
    target: e.currentTarget.parentElement as HTMLElement,
    // fadeAnimation: "inside",
    childClass: "bg-prim",
    // onRemoved: () => console.log("removed"),
    // containerClass: "bg-red animation-none",
    // childClass: "",
  });
};

const WithTarget = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const id = "with-target";
  PopupMe({
    id,
    Component: WithTargetComponent,
    componentProps: {
      text: "with target",
      tile: "ok",
    },
    target: e.currentTarget as HTMLElement,
    // fadeAnimation: "none",
    placement: "top",
    childClass: "bg-prim",
    // onRemoved: () => console.log("removed"),
    // containerClass: "bg-red animation-none",
    // childClass: "",
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

const mockArray = Array.from({ length: 100 }, (_, i) => i);

const TestViewOLD = () => {
  return (
    <div className="h-screen overflow-auto col gap-x p-x">
      <div className="bg-lord p-3x">
        <div onClick={Inside} className="button">
          Inside
        </div>
      </div>
      <div className="bg-cyan">
        <div onClick={WithTarget} className="button">
          Test with target
        </div>
      </div>
      <div>
        <div className="bg-lord p-x row gap-l justify-between">
          <div onClick={WithTarget} className="button">
            :
          </div>
          <div onClick={WithTarget} className="button">
            :
          </div>
          <div onClick={WithTarget} className="button">
            :
          </div>
        </div>
      </div>
      <div className="row gap-x p-l">
        <div className="bg-cyan">
          <div onClick={WithTarget} className="button">
            Test with target
          </div>
        </div>
        <div onClick={Center} className="button m-auto">
          Center
        </div>
        <div onClick={Bottom} className="button m-auto">
          Bottom
        </div>
        <div onClick={Top} className="button m-auto">
          Top
        </div>
        <div onClick={TestPopupOverlay} className="button m-auto">
          TestPopupOverlay
        </div>
        <div onClick={TestPrint} className="button m-auto bg-cyan">
          TestPrint
        </div>
      </div>
      {mockArray.map((_, i) => (
        <div key={i} className="bg-king p-3x m-1x">
          {i}
        </div>
      ))}
    </div>
  );
};

export default TestViewOLD;

interface ExampleProps {
  text: string;
  tile: string;
  overlay?: boolean;
}

const WithTargetComponent = ({ text, tile, overlay }: ExampleProps) => {
  return (
    <div className="p-l rounded-2x">
      <h1>Example </h1>
      <h2>{text}</h2>
      <h2>{tile}</h2>
      <h2>{`overlay :${overlay}`}</h2>
    </div>
  );
};
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
const ExampleTop = ({ text, tile, overlay }: ExampleProps) => {
  return (
    <div className="p-l rounded-2x col">
      <h1>Example </h1>
      <h2>{text}</h2>
      <h2>{tile}</h2>
      <h2>{`overlay :${overlay}`}</h2>
      <h2
        className="bg-red round-full mr-auto text-center self-center"
        style={{
          width: "30px",
          height: "30px",
        }}>
        {"x"}
      </h2>
    </div>
  );
};
const CenterComponent = ({ remove }: any) => {
  return (
    <div className="p-l rounded-2x col relative gap-l" style={{ minWidth: 400 }}>
      <h1>Example </h1>
      <h2>{"Hello"}</h2>
      <h2>{"World"}</h2>
      <h2
        className="bg-red round-full mr-auto text-center self-center absolute right-0 top-0"
        onClick={() => remove()}
        style={{ width: "30px", height: "30px" }}>
        {"x"}
      </h2>

      {Array.from({ length: 2 }, (_, i) => i).map((_, i) => (
        <div key={i} className="bg-king p-3x m-1x">
          {i}
        </div>
      ))}
    </div>
  );
};
