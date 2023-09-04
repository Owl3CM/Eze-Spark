import { createPortal } from "react-dom";
import { PopupComponent, PopupPortalProps, PopupController, PopupProps } from "./types";
import { buildProps, handleOutClick, sleep, steup } from "./Utils";

export const CurrentPopups: { [id: string]: any } = {};
export const Components: { [id: string]: PopupProps } = {};

export const PopupMe = async (args: PopupComponent) => {
  if (!(Popup as any).init) throw new Error("PopupMe must be used inside a ProviderContainer");
  const alreadyHasPopup = args.target && args.target.getAttribute("has-popup");
  const props = buildProps(args);
  if (PopupExits(props.id, props.key) && alreadyHasPopup) return Popup.remove(props.id);
  await Popup.remove(props.id);
  Components[props.id] = props;
  handleOutClick(props);
  Popup.render((Popup.r += 1));
  return () => Popup.remove(props.id);
};

export const Popup: PopupController = {
  create: PopupMe,
  getPopup: (id: string) => Components[id],
  getPopups: () => Components,
  getPopupIds: () => Object.keys(Components),
  render: (r: number) => {
    Popup.r = r;
  },
  remove: async (id: string = "global") => {
    await CurrentPopups[id]?.clear();
  },
  removeAll: () => {
    Object.keys(CurrentPopups).forEach((key) => CurrentPopups[key]?.clear());
  },
  r: 0,
  containerClass: "",
  offset: { x: 0, y: 0 },
  animation: "auto",
  overlayClass: "",
};

export const PopupPortal = (popProps: PopupPortalProps) => CurrentPopups[popProps.id] || createPopupPortal(popProps);
const PopupExits = (id: string, key: string) => CurrentPopups[id]?.key === key;

const createPopupPortal = ({
  Component,
  id,
  placement,
  overlay,
  target,
  key,
  offset,
  childClass,
  onRemoved,
  containerClass,
  animation,
  overlayClass,
  hasTarget,
}: PopupPortalProps) => {
  if (!hasTarget) target = document.body;
  CurrentPopups[id] = createPortal(
    <>
      <div
        key={key}
        id={id}
        className={containerClass}
        popup-has-target={`${hasTarget}`}
        ref={(container) => container && steup({ container, id, placement, target, offset, onRemoved, animation, hasTarget })}>
        <div
          style={{ pointerEvents: "all", position: hasTarget ? "static" : "absolute" }}
          ref={setpChild(animation)}
          id="provider-popup-child"
          className={childClass}>
          {Component}
        </div>
      </div>
      {overlay && <div className={overlayClass} id="provider-popup-overlay" onClick={() => Popup.remove(id)} />}
    </>,
    target
  );
  CurrentPopups[id].key = key;

  return CurrentPopups[id];
};

function setpChild(animation: string) {
  return (child: any) => {
    if (!child) return;
    let { clientHeight, clientWidth } = child;
    const { paddingTop, paddingBottom, paddingLeft, paddingRight } = window.getComputedStyle(child);
    const padding = [parseInt(paddingTop), parseInt(paddingRight), parseInt(paddingBottom), parseInt(paddingLeft)].join("px ") + "px";
    const { backgroundColor } = window.getComputedStyle(child);
    // document.body.style.setProperty("--provider-child-background", `${backgroundColor}`);
    child.parentElement.style.setProperty("--provider-child-background", `${backgroundColor}`);

    child.style.setProperty("--provider-child-height", `${clientHeight}px`);
    child.style.setProperty("--provider-child-width", `${clientWidth}px`);
    child.style.setProperty("--provider-child-padding", `${padding}`);
    child.setAttribute("fade-type", `${animation}-in`);
    child.style.position = "";
  };
}

export const convertToComponentIfNot = ({ Component, componentProps }: PopupComponent) =>
  typeof Component === "function" ? <Component {...componentProps} /> : Component;
