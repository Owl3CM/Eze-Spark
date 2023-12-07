import { CSSProperties } from "react";

// export type Animation = "width" | "height" | "width-height" | "scale-x" | "scale-y" | "scale-both" | "auto" | "none";
export type Animation =
  | "width"
  | "height"
  | "width-height"
  | "scale-x"
  | "scale-y"
  | "scale-both"
  | "auto"
  | "slide-bottom"
  | "slide-top"
  | "slide-left"
  | "slide-right"
  | "fade"
  | "none";
export interface PopupController {
  create: (Component: PopupComponentType, options: PopupOptions) => void;
  remove: (id: string) => void;
  removeAll: () => void;
  getPopup: (id: string) => PopupComponentArgs;
  getPopups: () => { [id: string]: PopupComponentArgs };
  getPopupIds: () => string[];
  r: number;
  render: (r: number) => void;
  containerClass?: string;
  childClass?: string;
  offset: { x: number; y: number };
  animation: Animation;
  overlayClass?: string;
}
export type PopupPlacement =
  | "auto"
  | "inside"
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "none";

export type PopupComponentType = React.ReactNode | React.FC<any>;
export interface PopupOptions {
  id?: string;
  placement?: PopupPlacement;
  target?: HTMLElement;
  overlay?: boolean;
  componentProps?: any;
  removeOnOutClick?: boolean;
  offset?: { x: number; y: number };
  viewPort?: any;
  childClass?: string;
  onRemoved?: () => void;
  containerClass?: string;
  animation?: Animation;
  overlayClass?: string;
  style?: CSSProperties;
}
export interface PopupComponentArgs extends PopupOptions {
  Component: React.ReactNode | React.FC<any>;
}
export interface PopupProps {
  id: string;
  Component: React.ReactNode;
  placement: PopupPlacement;
  target?: HTMLElement;
  overlay?: boolean;
  removeOnOutClick?: boolean;
  viewPort: any;
  key: string;
  childClass: string;
  containerClass?: string;
  animation?: Animation;
  hasTarget: boolean;
  style?: CSSProperties;
}
export type BuildProps = (Component: PopupComponentType, options: PopupOptions) => PopupProps;

export interface PopupContainerProps {
  containerClass?: string;
  primColor?: string;
  childClass?: string;
  overlayClass?: string;
  offset?: { x: number; y: number };
  animationTime?: number;
  clearOnNavigation?: boolean;
}

export interface SteupProps {
  container: HTMLDivElement;
  id: string;
  placement: string;
  target: HTMLElement;
  offset: { x: number; y: number };
  onRemoved?: () => void;
  animation?: Animation;
  hasTarget: boolean;
}

export interface GetStyleProps {
  container: HTMLElement;
  placement: string;
  target: HTMLElement;
  offset: { x: number; y: number };
  hasTarget?: boolean;
}

export interface PopupPortalProps {
  Component: React.ReactNode;
  id: string;
  placement: string;
  overlay: boolean;
  target: HTMLElement;
  key: string;
  viewPort: any;
  offset: { x: number; y: number };
  childClass?: string;
  onRemoved?: () => void;
  containerClass: string;
  animation: Animation;
  overlayClass?: string;
  hasTarget: boolean;
  removeOnOutClick?: boolean;
  style?: CSSProperties;
}

export interface PrintProps {
  componentProps?: any;
  afterPrint?: () => void;
}

type ScaleUpPlacement = "auto" | "horizontal" | "vertical" | "fill" | "fit";
export type ScaleUpAnimation = "auto" | "horizontal" | "vertical" | "fill" | "fit";
export interface ScaleUpOptions {
  id?: string;
  placement?: ScaleUpPlacement;
  target: HTMLElement;
  overlay?: boolean;
  componentProps?: any;
  removeOnOutClick?: boolean;
  offset?: { x: number; y: number };
  viewPort?: any;
  childClass?: string;
  onRemoved?: () => void;
  containerClass?: string;
  // animation?: ScaleUpAnimation;
  overlayClass?: string;
  style?: CSSProperties;
}
export interface ScaleUpComponentArgs extends ScaleUpOptions {
  Component: React.ReactNode | React.FC<any>;
}

export type ScaleUpProps = {
  id: string;
  Component: React.ReactNode;
  placement: ScaleUpPlacement;
  target: HTMLElement;
  overlay?: boolean;
  removeOnOutClick?: boolean;
  viewPort: any;
  key: string;
  childClass: string;
  containerClass?: string;
  animation?: ScaleUpAnimation;
  hasTarget: boolean;
  style?: CSSProperties;
};

export type ScaleUpBuildProps = (Component: PopupComponentType, options: ScaleUpOptions) => ScaleUpProps;
