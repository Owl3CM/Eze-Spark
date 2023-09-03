export type FadeAnimation = "width" | "height" | "width-height" | "scale-x" | "scale-y" | "scale-both" | "auto" | "none";
export interface PopupController {
  create: (props: PopupComponent) => void;
  remove: (id?: string) => void;
  removeAll: () => void;
  getPopup: (id: string) => PopupComponent;
  getPopups: () => { [id: string]: PopupComponent };
  getPopupIds: () => string[];
  r: number;
  render: (r: number) => void;
  containerClass?: string;
  childClass?: string;
  offset: { x: number; y: number };
  fadeAnimation: FadeAnimation;
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
  //Todo remove this
  | "list"
  | "none";

export interface PopupComponent {
  id?: string;
  Component: React.ReactNode | React.FC<any>;
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
  fadeAnimation?: FadeAnimation;
  overlayClass?: string;
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
  fadeAnimation?: FadeAnimation;
  hasTarget: boolean;
}
export type BuildProps = (props: PopupComponent) => PopupProps;

export interface PopupContainerProps {
  containerClass?: string;
  primColor?: string;
  childClass?: string;
  overlayClass?: string;
  offset?: { x: number; y: number };
  animationTime?: number;
}

export interface SteupProps {
  container: HTMLDivElement;
  id: string;
  placement: string;
  target: HTMLElement;
  offset: { x: number; y: number };
  onRemoved?: () => void;
  fadeAnimation?: FadeAnimation;
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
  fadeAnimation: FadeAnimation;
  overlayClass?: string;
  hasTarget: boolean;
}

export interface PrintProps {
  Component: React.ReactNode | React.FC<any>;
  componentProps?: any;
  afterPrint?: () => void;
}
