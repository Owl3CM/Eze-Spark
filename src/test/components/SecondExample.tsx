import React from "react";
import { Popup, PopupMe } from "../../lib";

let animation = "auto" as any;
let placement = "auto" as any;

const PopupAnimationsContainer = (target) => {
  const id = "popup-animations-container";
  // the component to be rendered inside the popup
  const Component = (
    <div className="grid-small">
      {animations.map((anim) => (
        <div
          className={`button ${animation === anim ? "selected" : ""}`}
          key={anim}
          style={{
            opacity: animation === anim ? 1 : 0.7,
            fontSize: "10px",
          }}
          onClick={() => {
            animation = anim;
            Popup.remove(id);
          }}>
          {anim}
        </div>
      ))}
    </div>
  );

  PopupMe({
    id,
    Component,
    animation,
    // placement,
    // target,
  });
};

const PopupPlacementContainer = (target) => {
  const id = "popup-placement-container";
  // the component to be rendered inside the popup
  const Component = (
    <div className="grid-small">
      {placementsWithTarget.map((place) => (
        <div
          className={`button ${placement === place ? "selected" : ""}`}
          key={place}
          style={{
            opacity: placement === place ? 1 : 0.7,
            fontSize: "10px",
          }}
          onClick={() => {
            placement = place;
            Popup.remove(id);
          }}>
          {place}
        </div>
      ))}
    </div>
  );

  PopupMe({
    id,
    Component,
    // animation,
    // placement,
    // target,
  });
};

const PopupExample = () => {
  const [title, setTitle] = React.useState("Hello World ");

  return (
    <div className="col bg">
      <div className="wrapper center">
        <div
          onClick={(e: any) => {
            PopupAnimationsContainer(e.target);
          }}
          className="button">
          {"Animation"}
        </div>
        <div
          className="button"
          onClick={(e: any) => {
            PopupPlacementContainer(e.target);
          }}>
          {"Placement"}
        </div>
        <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={({ target }) => target.select()} />
        <div
          className="button"
          onClick={(e: any) => {
            PopupMe({
              Component: <PopupChild placement={placement} animation={animation} title={title} />,
              animation,
              placement,
              target: e.target,
            });
          }}>
          {"Relative to me"}
        </div>
        <div
          className="button"
          onClick={() => {
            PopupMe({
              Component: <PopupChild placement={placement} animation={animation} title={title} />,
              animation,
              placement,
            });
          }}>
          {"Relative to body"}
        </div>
      </div>
    </div>
  );
};

export default PopupExample;

const PopupChild = ({ title, animation, placement }: any) => {
  return (
    <div className="col min-w-max">
      <p>
        <span className="text-light">animation:</span>
        <span className="text-red px-l">{animation}</span>
      </p>
      <p>
        <span className="text-light">placement:</span>
        <span className="text-red px-l">{placement}</span>
      </p>
      <br />
      <p>
        <span className="text-light">title: </span>
        <span className="text-red px-l">{title}</span>
      </p>
    </div>
  );
};

const placements = [
  //
  "auto",
  "inside",
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "left",
  "right",
  "none",
];
const placementsWithTarget = [
  //
  "auto",
  "center",
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "left",
  "right",
  "none",
];
const animations = [
  "width",
  "height",
  "width-height",
  "scale-x",
  "scale-y",
  "scale-both",
  "auto",
  "slide-bottom",
  "slide-top",
  "slide-left",
  "slide-right",
  "fade",
  "none",
];
