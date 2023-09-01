import { createPortal } from "react-dom";
import { PopupComponent, PopupPortalProps, PopupController, PopupProps } from "./types";
import { buildProps, removeMe, sleep, steup } from "./Utils";

export const CurrentPopups: { [id: string]: any } = {};
export const Components: { [id: string]: PopupProps } = {};

const PopupExits = (id: string, key: string) => CurrentPopups[id]?.key === key;

export const PopupMe = async (args: PopupComponent) => {
  if (args.target && args.target.classList.contains("has-popup")) return Popup.remove(args.id);
  if (!(Popup as any).init) throw new Error("PopupMe must be used inside a ProviderContainer");
  const props = buildProps(args);
  if (PopupExits(props.id, props.key)) return;

  Popup.remove(props.id);
  await sleep(1);
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
  remove: (id: string = "global") => {
    CurrentPopups[id]?.clear();
  },
  removeAll: () => {
    Object.keys(CurrentPopups).forEach((key) => CurrentPopups[key]?.clear());
  },
  r: 0,
  containerClass: "provider-popup-container",
  offset: { x: 0, y: 0 },
};

export const PopupPortal = (popProps: PopupPortalProps) => CurrentPopups[popProps.id] || createPopupPortal(popProps);

const createPopupPortal = ({
  Component,
  id,
  placement,
  overlay,
  target = document.body,
  key,
  offset,
  childClass,
  onRemoved,
  containerClass,
}: PopupPortalProps) => {
  CurrentPopups[id] = createPortal(
    <>
      <div
        key={key}
        id={id}
        onAnimationEnd={removeMe}
        className={containerClass}
        ref={(container) => container && steup({ container, id, placement, target, offset, onRemoved: onRemoved })}>
        <div className={childClass}>{Component}</div>
      </div>
      {Overlay(id, overlay)}
    </>,
    target
  );
  CurrentPopups[id].key = key;

  return CurrentPopups[id];
};
const Overlay = (id: string, overlay?: boolean) => overlay && <span onClick={() => Popup.remove(id)} className="provider-popup-overlay"></span>;

function handleOutClick(props: PopupProps) {
  if (props.removeOnOutClick) {
    setTimeout(() => {
      const popup = document.getElementById(props.id);
      if (popup) {
        const remove = props.target
          ? async ({ target }: any) => {
              if (popup.contains(target) || props.target?.contains(target)) return;
              document.removeEventListener("pointerdown", remove);
              Popup.remove(props.id);
            }
          : ({ target }: any) => {
              if (popup.firstChild?.contains(target)) return;
              Popup.remove(props.id);
              document.removeEventListener("pointerdown", remove);
            };
        document.addEventListener("pointerdown", remove);
      }
    }, 5);
  }
}

export const convertToComponentIfNot = ({ Component, componentProps }: PopupComponent) =>
  typeof Component === "function" ? <Component {...componentProps} /> : Component;
