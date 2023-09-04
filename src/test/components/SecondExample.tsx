import React from "react";
import { PopupMe, PopupPlacement } from "../../lib";

const popupFunction = ({ title, target, placement, animation }: any) => {
  PopupMe({
    Component: PopupChild,
    componentProps: { title },
    animation,
    placement,
    target,
  });
};

const PopupExample = () => {
  const [title, setTitle] = React.useState("Hello World !");
  const [placement, setPlacement] = React.useState<PopupPlacement>("auto");
  const [animation, setAnimation] = React.useState("auto");
  return (
    <div className="col" style={{ margin: "auto" }}>
      <div>
        Animation
        <div className="wrap">
          {animations.map((anim) => (
            <div
              className={`button ${animation === anim ? "selected" : ""}`}
              key={anim}
              style={{
                opacity: animation === anim ? 1 : 0.7,
                fontSize: "10px",
              }}
              onClick={() => {
                setAnimation(anim as any);
                popupFunction({ title, animation: anim, placement });
              }}>
              {anim}
            </div>
          ))}
        </div>
      </div>
      <div>
        Placement with target
        <div className="wrap">
          {placements.map((plac) => (
            <div
              className={`button ${placement === plac ? "selected" : ""}`}
              key={plac}
              style={{
                opacity: placement === plac ? 1 : 0.7,
                fontSize: "10px",
              }}
              onClick={({ target }) => {
                setPlacement(plac as any);
                popupFunction({ title, target, animation, placement: plac });
              }}>
              {plac}
            </div>
          ))}
        </div>
      </div>

      <div>
        Placement
        <div className="wrap">
          {placementsWithTarget.map((plac) => (
            <div
              className={`button ${placement === plac ? "selected" : ""}`}
              key={plac}
              style={{
                opacity: placement === plac ? 1 : 0.7,
                fontSize: "10px",
              }}
              onClick={() => {
                setPlacement(plac as any);
                popupFunction({ title, animation, placement: plac });
              }}>
              {plac}
            </div>
          ))}
        </div>
      </div>

      <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} onFocus={({ target }) => target.select()} />
      <div
        className="button"
        onClick={({ target }) => {
          popupFunction({ title, target, animation, placement });
        }}>
        Relative to me
      </div>
      <div
        className="button"
        onClick={({}) => {
          popupFunction({ title, animation, placement });
        }}>
        Relative to body
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
  "debounce",
  "fade",
  "none",
];
