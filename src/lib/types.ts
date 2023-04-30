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
}
export type PopupPlacement =
  | "auto"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "inside";
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
}

export type BuildProps = (props: PopupComponent) => PopupProps;
export interface PopupContainerProps {
  containerClass?: string;
  overlayColor?: string;
  primColor?: string;
  childClass?: string;
  offset?: { x: number; y: number };
}

export interface SteupProps {
  container: HTMLDivElement;
  id: string;
  placement: string;
  target: HTMLElement;
  offset: { x: number; y: number };
}

export interface GetStyleProps {
  container: HTMLElement;
  placement: string;
  target: HTMLElement;
  offset: { x: number; y: number };
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
}

export interface PrintProps {
  Component: React.ReactNode | React.FC<any>;
  componentProps?: any;
  afterPrint?: () => void;
}
