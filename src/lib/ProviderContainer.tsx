import React, { useState, useMemo } from "react";
import { Components, Popup, PopupPortal } from "./ProviderController";
import { PrintPortal } from "./PrintMe";
import { PopupContainerProps } from "./types";
import { useLocation } from "react-router-dom";

export const ProviderContainer = ({ clearOnNavigation = true, ...props }: PopupContainerProps) => {
  return (
    <>
      <Popups {...props} />
      {clearOnNavigation && <NavigationListener />}
    </>
  );
};

const Popups = ({
  offset = { x: 0, y: 0 },
  containerClass = "",
  childClass = "provider-popup-child",
  overlayClass = "provider-overlay",
  animationTime = 300,
}: PopupContainerProps) => {
  [Popup.r, Popup.render] = useState<number>(Popup.r);

  useMemo(() => setupOptions(containerClass, childClass, offset, overlayClass, animationTime), []);
  return useMemo(() => <>{Object.values(Components)?.map(portalBuilder) ?? null}</>, [Popup.r]);
};

const setupOptions = (containerClass?: string, childClass?: string, offset?: { x: number; y: number }, overlayClass?: string, animationTime?: number) => {
  const htmlEl = document.documentElement;
  animationTime && htmlEl.style.setProperty("--popup-animation-time", `${animationTime}ms`);
  Object.assign(Popup, { containerClass, childClass, offset, overlayClass, init: true });
};

const portalBuilder = (popProps: any) => (popProps.id === "print-me" ? PrintPortal(popProps) : PopupPortal(popProps));

const NavigationListener = () => {
  const location = useLocation();
  React.useEffect(() => {
    Popup.removeAll();
  }, [location.pathname]);
  return null;
};
