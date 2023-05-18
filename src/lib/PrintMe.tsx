import { createPortal } from "react-dom";
import { Components, Popup } from "./ProviderController";
import { PrintProps } from "./types";
import { isMobile } from "./Utils";

export const PrintMe = ({ Component, componentProps = {}, afterPrint }: PrintProps) => {
  if (document.querySelector(".print-me")) return;
  const id = "print-me";
  Component = typeof Component === "function" ? <Component {...componentProps} /> : Component;
  Components[id] = {
    Component,
    id,
    placement: "center",
    target: document.body,
    key: "print-key",
    viewPort: window,
    childClass: "",
  };

  function cleanAfterPrint() {
    setTimeout(
      () => {
        document.body.classList.remove("print");
        delete Components[id];
        afterPrint?.();
        Popup.render(Math.random());
      },
      isMobile ? 2000 : 100
    );
  }
  window.addEventListener("afterprint", cleanAfterPrint, { once: true });
  Popup.render(Math.random());
};

export const PrintPortal = (popProps: { Component: React.ReactNode }) => {
  return createPortal(
    <div ref={(container) => container && printme(container)} className="print-me">
      {popProps.Component}
    </div>,
    document.body
  );
};

const printme = async (container: HTMLElement) => {
  const images = container.querySelectorAll("img");
  if (images.length) {
    // wait for all images to load
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        });
      })
    );
  }
  document.body.classList.add("print");
  setTimeout(() => {
    window.print();
  }, 10);
};
