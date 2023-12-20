//  Nwe Future
import { CSSProperties } from "react";
import { Components, Popup, PopupExits, convertToComponentIfNot } from "./ProviderController";
import { getUniqueKey, handleOutClick } from "./Utils";
import { PopupComponentType, PopupProps, ScaleUpBuildProps, ScaleUpOptions } from "./types";

export const ScaleMe = async (Component: PopupComponentType, options: ScaleUpOptions) => {
  if (!(Popup as any).init) throw new Error("PopupMe must be used inside a ProviderContainer");
  const alreadyHasPopup = options.target && options.target.getAttribute("has-popup");

  const offset = options.offset ?? { y: 0, x: 0 }; //Popup.offset;
  options.childClass = options.childClass ? `scale-up-target ${options.childClass}` : `scale-up-target`;
  options.style = { ...options.style, ...getTargetPostionStyle(options.target as any, offset) };
  const props = buildProps(Component, options);

  if (PopupExits(props.id, props.key) || alreadyHasPopup) return Popup.remove(props.id);
  await Popup.remove(props.id);

  //Todo : Check here if need to add new Components
  Components[props.id] = props as PopupProps;
  handleOutClick(props as PopupProps);
  Popup.render((Popup.r += 1));
  return () => Popup.remove(props.id);
};

const getTargetPostionStyle = (target: HTMLDivElement, offset: { x: number; y: number }) => {
  //   console.log({
  //     offsetHeight: target.offsetHeight,
  //     offsetWidth: target.offsetWidth,
  //     offsetTop: target.offsetTop,
  //     offsetLeft: target.offsetLeft,
  //     clientHeight: target.clientHeight,
  //     clientWidth: target.clientWidth,
  //     clientTop: target.clientTop,
  //     clientLeft: target.clientLeft,
  //     scrollHeight: target.scrollHeight,
  //   });
  const currentTargetPostion = target.getBoundingClientRect();
  const paddingX = getPadding(target);
  return {
    "--scale-up-target-height": Math.round(currentTargetPostion.height) + "px",
    "--scale-up-target-width": Math.round(currentTargetPostion.width) + "px",
    "--scale-up-target-top": Math.round(currentTargetPostion.top) + "px",
    "--scale-up-target-left": Math.round(currentTargetPostion.left) + "px",
    "--scale-up-target-offset-x": offset.x + "px",
    "--scale-up-target-offset-y": offset.y + "px",
    "--scale-up-target-padding-x": +paddingX.left + paddingX.right + "px",
  } as CSSProperties;
};
const getPadding = (currentTarget: any) => {
  const style = getComputedStyle(currentTarget);
  return {
    left: parseInt(style.paddingLeft.replace("px", "") || "0"),
    right: parseInt(style.paddingRight.replace("px", "") || "0"),
    top: parseInt(style.paddingTop.replace("px", "") || "0"),
    bottom: parseInt(style.paddingBottom.replace("px", "") || "0"),
  };
};

export const buildProps: ScaleUpBuildProps = (Component: PopupComponentType, options: ScaleUpOptions) => {
  // options.placement = "fill";
  if (!options.placement) options.placement = "auto";
  //   if (!options.animation) options.animation = "fill";
  const target = options.target;
  const placement = options.placement === "auto" ? "fill" : options.placement;
  const overlay = options.overlay ?? placement === "fill";
  const animation = options.placement;

  const _Component = convertToComponentIfNot({ Component, componentProps: options.componentProps });
  const offset = options.offset ?? { y: 0, x: 0 }; //Popup.offset;
  const id = options.id ?? `${Math.random()}`.replace(".", "");
  const childClass = (options.childClass ?? Popup.childClass) as string;
  const onRemoved = options.onRemoved;
  const containerClass = options.containerClass ?? Popup.containerClass;

  if (target) target.setAttribute("has-popup", "true");
  return {
    Component: _Component,
    id,
    placement,
    overlay,
    target: placement === "fit" ? target : document.body,
    key: getUniqueKey(target, _Component) + id,
    viewPort: options.viewPort ?? window,
    removeOnOutClick: options.removeOnOutClick !== false,
    offset,
    childClass,
    onRemoved,
    containerClass,
    animation,
    overlayClass: options.overlayClass ?? Popup.overlayClass,
    hasTarget: false,
    style: options.style,
  };
};
