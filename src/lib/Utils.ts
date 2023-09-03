import { Components, convertToComponentIfNot, CurrentPopups, Popup } from "./ProviderController";
import { FadeAnimation, BuildProps, GetStyleProps, PopupComponent, PopupPlacement, PopupProps, SteupProps } from "./types";
export const animationDely = 200;
export const buildProps: BuildProps = (args: PopupComponent) => {
  const target = args.target;
  const placement = args.placement ?? (target ? "auto" : "center");
  const overlay = args.overlay ?? placement === "center";

  const Component = convertToComponentIfNot(args);
  const offset = args.offset ?? Popup.offset;
  const id = args.id ?? "global";
  const childClass = (args.childClass ?? Popup.childClass) as string;
  const onRemoved = args.onRemoved;
  const containerClass = args.containerClass ?? Popup.containerClass;
  const fadeAnimation = args.fadeAnimation ?? Popup.fadeAnimation;

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
    onRemoved,
    containerClass,
    fadeAnimation,
    overlayClass: args.overlayClass ?? Popup.overlayClass,
    hasTarget: !!target,
  };
};

export const steup = ({ container, id, placement, target, offset, onRemoved, fadeAnimation, hasTarget }: SteupProps) => {
  container.style.cssText = getStyle({ container, placement, target, offset, hasTarget });

  CurrentPopups[id].clear = async () => {
    const parent = container.parentElement;
    delete CurrentPopups[id];
    delete Components[container.id!];

    container.classList.add("opacity-out");
    parent?.querySelector("#provider-popup-overlay")?.classList.add("opacity-out");

    (container.firstChild as any)?.setAttribute("fade-type", `${fadeAnimation}-out`);
    const time = getComputedStyle(document.documentElement).getPropertyValue("--popup-animation-time");
    await sleep(time ? parseInt(time) : animationDely);
    onRemoved?.();
    Popup.render(Math.random());
    await sleep(10);
    parent?.classList.remove("has-popup");
  };
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const isMobile = () => {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent.toLowerCase().match(/mobile/i) != null;
};

const getUniqueKey = (target: any, Component: React.ReactNode) => JSON.stringify(target?.getBoundingClientRect() || Component);

const getStyle = ({ container, placement, target, offset, hasTarget }: GetStyleProps) => {
  let sty = "pointer-events:none;z-index:1001;" + (container.style.cssText || "");
  if (!hasTarget) {
    return getStyleWithoutTarget({ sty, container, placement, offset });
  }

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
    sty += getPosForTarget[pos]?.({ targetDim, containerDim });
  });
  sty += `transform:translate(${offset.x}px,${offset.y}px);`;
  return sty;
};

const getStyleWithoutTarget = ({ sty, container, placement, offset }: any) => {
  container.setAttribute("placement", placement);

  placement.split("-").forEach((pos: string) => {
    sty += getPos[pos]?.();
  });

  sty += `transform:translate(${offset.x}px,${offset.y}px);`;
  return sty;
};

const getPos: any = {
  center: () => `inset:0;padding:100px 10px;`,
  top: () => {
    return `top:${0}px;`;
  },
  bottom: () => {
    return `bottom:${0}px;`;
  },
  left: () => {
    return `left:${0}px;`;
  },
  right: () => {
    return `right:${0}px;`;
  },
};

const fixPostion: any = {
  top: (targetDim: any) => `top-${getXPOS(targetDim)}`,
  bottom: (targetDim: any) => `bottom-${getXPOS(targetDim)}`,
  left: (targetDim: any) => `${getYPOS(targetDim)}-left`,
  right: (targetDim: any) => `${getYPOS(targetDim)}-right`,
  auto: (targetDim: any) => `${getYPOS(targetDim)}-${getXPOS(targetDim)}`,
  center: () => "center",
};

const getPosForTarget: any = {
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

export function handleOutClick(props: PopupProps) {
  if (props.removeOnOutClick && !props.overlay) {
    setTimeout(() => {
      const popup = document.getElementById(props.id);
      if (popup) {
        const remove = props.target
          ? async ({ target }: any) => {
              if (popup.contains(target) || props.target?.contains(target)) return;
              await sleep(10);
              document.removeEventListener("pointerup", remove);
              Popup.remove(props.id);
            }
          : async ({ target }: any) => {
              if (popup.firstChild?.contains(target)) return;
              await sleep(10);
              document.removeEventListener("pointerup", remove);
              Popup.remove(props.id);
            };
        document.addEventListener("pointerup", remove);
      }
    }, 5);
  }
}
