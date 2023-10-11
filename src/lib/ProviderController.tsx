import { createPortal } from "react-dom";
import { PopupOptions, PopupPortalProps, PopupController, PopupProps, PopupComponentType } from "./types";
import { buildProps, handleOutClick, setpChild, sleep, steup } from "./Utils";

export const CurrentPopups: { [id: string]: any } = {};
export const Components: { [id: string]: PopupProps } = {};

export const PopupMe = async (Component: PopupComponentType, options: PopupOptions = {}) => {
  if (!(Popup as any).init) throw new Error("PopupMe must be used inside a ProviderContainer");
  const alreadyHasPopup = options.target && options.target.getAttribute("has-popup");
  const props = buildProps(Component, options);
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
  remove: async (id: string) => {
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
}: // removeOnOutClick,
PopupPortalProps) => {
  if (!hasTarget) target = document.body;
  CurrentPopups[id] = createPortal(
    <>
      <div
        key={key}
        id={id}
        className={containerClass}
        popup-has-target={`${hasTarget}`}
        ref={(container) => container && steup({ container, id, placement, target, offset, onRemoved, animation, hasTarget })}>
        <div style={{ pointerEvents: "all" }} ref={setpChild(animation)} id="provider-popup-child" className={childClass}>
          {Component}
        </div>
      </div>
      {overlay && (
        <div
          className={overlayClass}
          id="provider-popup-overlay"
          // onClick={() => removeOnOutClick && Popup.remove(id)}
        />
      )}
    </>,
    target
  );
  CurrentPopups[id].key = key;

  return CurrentPopups[id];
};

export const convertToComponentIfNot = ({ Component, componentProps }: { Component: PopupComponentType; componentProps: any }) =>
  typeof Component === "function" ? <Component {...componentProps} /> : Component;
