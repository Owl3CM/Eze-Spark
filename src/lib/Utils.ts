import { Components, convertToComponentIfNot, CurrentPopups, Popup } from "./ProviderController";
import { BuildProps, GetStyleProps, PopupComponent, SteupProps } from "./types";

export const buildProps: BuildProps = (args: PopupComponent) => {
  const target = args.target;
  const placement = args.placement ?? (target ? "auto" : "center");
  const overlay = args.overlay === true || placement === "center";
  const Component = convertToComponentIfNot(args);
  const offset = args.offset ?? Popup.offset;
  const id = args.id ?? "global";
  const childClass = (args.childClass ?? Popup.childClass) as string;

  if (target) target.classList.add("has-popup");
  return {
    Component,
    id,
    placement,
    overlay,
    target,
    key: getUniqueKey(target, Component) + id,
    viewPort: args.viewPort ?? window,
    removeOnOutClick: args.removeOnOutClick !== false,
    offset,
    childClass,
  };
};

export const steup = ({ container, id, placement, target, offset }: SteupProps) => {
  container.style.cssText = getStyle({ container, placement, target, offset });
  CurrentPopups[id].clear = () => {
    CurrentPopups[id] = null;
    container.parentElement?.classList.remove("has-popup");
    delete Components[container.id!];
    Popup.render(Math.random());
  };
};

export const removeMe = ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
  if (currentTarget.classList.contains("pop-out")) {
    delete Components[currentTarget.id!];
    Popup.render(Math.random());
  }
};
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getUniqueKey = (target: any, Component: React.ReactNode) => JSON.stringify(target?.getBoundingClientRect() || Component);

const getStyle = ({ container, placement, target, offset }: GetStyleProps) => {
  let sty = "placement:absolute;";

  let targetDim: any = target.getBoundingClientRect();
  targetDim.offsetWidth = target.offsetWidth;
  targetDim.offsetHeight = target.offsetHeight;

  let containerDim: any = container.getBoundingClientRect();
  containerDim.offsetWidth = container.offsetWidth;
  containerDim.offsetHeight = container.offsetHeight;

  const fixFucntion = fixPostion[placement];
  if (fixFucntion) placement = fixFucntion(targetDim);

  container.setAttribute("placement", placement);

  placement.split("-").forEach((pos) => {
    sty += getPos[pos]?.({ targetDim, containerDim });
  });
  sty += `transform:translate(${offset.x}px,${offset.y}px);`;
  return sty;
};

const fixPostion: any = {
  top: (targetDim: any) => `top-${getXPOS(targetDim)}`,
  bottom: (targetDim: any) => `bottom-${getXPOS(targetDim)}`,
  left: (targetDim: any) => `${getYPOS(targetDim)}-left`,
  right: (targetDim: any) => `${getYPOS(targetDim)}-right`,
  auto: (targetDim: any) => `${getYPOS(targetDim)}-${getXPOS(targetDim)}`,
  center: () => "center",
};

const getPos: any = {
  center: () => `inset:0`,
  top: ({ targetDim, containerDim }: any) => {
    let emptySpace = targetDim.y + targetDim.offsetHeight - containerDim.offsetHeight;
    if (emptySpace > 0) emptySpace = targetDim.offsetHeight;
    return `bottom:${emptySpace}px;`;
  },
  bottom: ({ targetDim, containerDim }: any) => {
    let emptySpace = targetDim.y + targetDim.offsetHeight;
    const y = targetDim.y + containerDim.offsetHeight - window.innerHeight;
    if (y > 0) emptySpace = y > emptySpace ? emptySpace : y;
    else emptySpace = -targetDim.offsetHeight;
    return `top:${-emptySpace}px;`;
  },
  left: ({ targetDim, containerDim }: any) => {
    let emptySpace = targetDim.x + targetDim.offsetWidth - containerDim.offsetWidth;
    if (emptySpace > 0) emptySpace = 0;
    return `right:${emptySpace}px;`;
  },
  right: ({ targetDim, containerDim }: any) => {
    let emptySpace = targetDim.x;
    const x = targetDim.x + containerDim.offsetWidth - window.innerWidth;
    if (x > 0) emptySpace = x > emptySpace ? emptySpace : x;
    else emptySpace = 0;
    return `left:${-emptySpace}px;`;
  },
};

const getXPOS = (targetDim: any) => (targetDim.x < window.innerWidth / 2 ? "right" : "left");
const getYPOS = (targetDim: any) => (targetDim.y < window.innerHeight / 2 ? "bottom" : "top");
