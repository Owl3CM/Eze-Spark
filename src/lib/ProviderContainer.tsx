import React, { useState, useMemo } from "react";
import { Components, Popup, PopupPortal } from "./ProviderController";
import { PrintPortal } from "./PrintMe";
import { PopupContainerProps } from "./types";

export const ProviderContainer = ({ containerClass, overlayColor, primColor, childClass = "popup-child", offset }: PopupContainerProps) => {
  [Popup.r, Popup.render] = useState<number>(Popup.r);
  useMemo(() => setupOptions(overlayColor, primColor, containerClass, childClass, offset), []);
  return useMemo(() => <>{Object.values(Components)?.map(portalBuilder) ?? null}</>, [Popup.r]);
};

const portalBuilder = (popProps: any) => (popProps.id === "print-me" ? PrintPortal(popProps) : PopupPortal(popProps));

const setupOptions = (overlayColor?: string, primColor?: string, containerClass?: string, childClass?: string, offset?: number) => {
  Popup.offset = offset ?? Popup.offset;
  const htmlEl = document.documentElement;
  overlayColor && htmlEl.style.setProperty("--overlay-color", overlayColor);
  primColor && htmlEl.style.setProperty("--popup-prim", primColor);
  Popup.containerClass = "popup-container" + (containerClass ? ` ${containerClass}` : "");
  Popup.childClass = childClass;
};
