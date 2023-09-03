import { useState, useMemo } from "react";
import { Components, Popup, PopupPortal } from "./ProviderController";
import { PrintPortal } from "./PrintMe";
import { PopupContainerProps } from "./types";

export const ProviderContainer = ({
  primColor,
  offset = { x: 0, y: 0 },
  containerClass = "",
  childClass = "",
  overlayClass = "",
  animationTime = 300,
}: PopupContainerProps) => {
  [Popup.r, Popup.render] = useState<number>(Popup.r);
  useMemo(() => setupOptions(primColor, containerClass, childClass, offset, overlayClass, animationTime), []);
  return useMemo(() => <>{Object.values(Components)?.map(portalBuilder) ?? null}</>, [Popup.r]);
};

const portalBuilder = (popProps: any) => (popProps.id === "print-me" ? PrintPortal(popProps) : PopupPortal(popProps));

const setupOptions = (
  primColor?: string,
  containerClass?: string,
  childClass?: string,
  offset?: { x: number; y: number },
  overlayClass?: string,
  animationTime?: number
) => {
  const htmlEl = document.documentElement;
  primColor && htmlEl.style.setProperty("--popup-prim", primColor);
  animationTime && htmlEl.style.setProperty("--popup-animation-time", `${animationTime}ms`);

  Object.assign(Popup, { containerClass, childClass, offset, overlayClass, init: true });
};
