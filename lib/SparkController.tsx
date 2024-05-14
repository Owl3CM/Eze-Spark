import { createPortal } from "react-dom";
import {
  PopupOptions,
  PopupPortalProps,
  PopupController,
  PopupProps,
  PopupComponentType,
  PopupPlacement,
  BuildProps,
  Animation,
  InAndOutAnimation,
} from "./types";
import { getUniqueKey, handleOutClick, setpChild, sleep, steup } from "./Utils";

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
  // updatePopupProps: async ({ id, Component, getProps }) => {
  //   let component = Components[id] as any;
  //   if (!component) return;
  //   const _props = getProps(component.Component["props"]);
  //   component.Component = <Component {..._props} />;
  //   // CurrentPopups[id].key = Math.random();
  //   delete CurrentPopups[id];

  //   Popup.render((Popup.r += 1));
  // },
  // updatePopup: async (id: string, props: (prev: any) => any) => {
  //   let component = Components[id] as any;
  //   if (!component) return;
  //   component = props(component);
  //   // CurrentPopups[id].key = Math.random();
  //   delete CurrentPopups[id];

  //   Popup.render((Popup.r += 1));
  // },
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
export const PopupExits = (id: string, key: string) => CurrentPopups[id]?.key === key;

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
  style,
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
        <div style={{ pointerEvents: "all", ...style }} ref={setpChild(animation)} id="provider-popup-child" className={childClass}>
          {Component}
        </div>
      </div>
      {overlay && (
        <div
          className={`provider-popup-overlay ${overlayClass}`}
          id={"provider-popup-overlay_" + id}
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

const buildProps: BuildProps = (Component: PopupComponentType, options: PopupOptions) => {
  if (!options.placement) options.placement = "auto";
  if (!options.animation) options.animation = Popup.animation;
  const target = options.target;
  const hasTarget = !!target;
  const placement = options.placement === "auto" && !hasTarget ? "center" : options.placement;
  const overlay = options.overlay ?? placement === "center";

  const offset = options.offset ?? Popup.offset;
  const id = options.id ?? `${Math.random()}`.replace(".", "");
  const childClass = (options.childClass ?? Popup.childClass) as string;
  const onRemoved = options.onRemoved;
  const containerClass = options.containerClass ?? Popup.containerClass;
  const componentProps = options.componentProps ?? {};
  componentProps.popup = {
    remove: () => Popup.remove(id),
    render: () => {
      delete CurrentPopups[id];
      setTimeout(() => {
        Popup.render((Popup.r += 1));
      }, 1000);
    },
  };

  const animation = getFadeAnimation(placement, hasTarget, options.animation);

  if (target) target.setAttribute("has-popup", "true");

  const _Component = convertToComponentIfNot({ Component, componentProps });

  return {
    Component: _Component,
    id,
    placement,
    overlay,
    target,
    key: getUniqueKey(target, _Component) + id,
    viewPort: options.viewPort ?? window,
    removeOnOutClick: options.removeOnOutClick !== false,
    offset,
    childClass,
    onRemoved,
    containerClass,
    animation,
    overlayClass: options.overlayClass ?? Popup.overlayClass,
    hasTarget,
    style: options.style,
  };
};

interface GetFadeAnimation {
  (placement: PopupPlacement, hasTarget: boolean, animation: Animation | InAndOutAnimation): InAndOutAnimation;
}

const getFadeAnimation: GetFadeAnimation = (placement: PopupPlacement, hasTarget: boolean, animation: Animation | InAndOutAnimation) => {
  if (typeof animation === "object") return animation;
  if (animation === "auto") {
    if (!hasTarget) {
      if (placement.startsWith("top")) return { in: "slide-top", out: "slide-top" };
      if (placement.startsWith("bottom")) return { in: "slide-bottom", out: "slide-bottom" };
      if (placement.startsWith("left")) return { in: "slide-left", out: "slide-left" };
      if (placement.startsWith("right")) return { in: "slide-right", out: "slide-right" };
      if (placement === "center") return { in: "scale-both", out: "scale-both" };
    }
    return { in: "fade", out: "fade" };
  } else {
    return { in: animation, out: animation };
  }
};
