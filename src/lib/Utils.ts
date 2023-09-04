import { Components, convertToComponentIfNot, CurrentPopups, Popup } from "./ProviderController";
import { Animation, BuildProps, GetStyleProps, PopupComponent, PopupPlacement, PopupProps, SteupProps } from "./types";

export const buildProps: BuildProps = (args: PopupComponent) => {
  const target = args.target;
  const hasTarget = !!target;
  const placement = args.placement === "auto" && !hasTarget ? "center" : (args.placement as PopupPlacement);
  const overlay = args.overlay ?? placement === "center";

  const Component = convertToComponentIfNot(args);
  const offset = args.offset ?? Popup.offset;
  const id = args.id ?? "global";
  const childClass = (args.childClass ?? Popup.childClass) as string;
  const onRemoved = args.onRemoved;
  const containerClass = args.containerClass ?? Popup.containerClass;
  let animation = args.animation ?? Popup.animation;

  if (animation === "auto") animation = getFadeAnimation(placement, hasTarget);

  if (target) target.setAttribute("has-popup", "true");
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
    animation,
    overlayClass: args.overlayClass ?? Popup.overlayClass,
    hasTarget,
  };
};
interface GetFadeAnimation {
  (placement: PopupPlacement, hasTarget: boolean): Animation;
}

export const getFadeAnimation: GetFadeAnimation = (placement: PopupPlacement, hasTarget: boolean) => {
  if (!hasTarget) {
    // if (placement.startsWith("left") || placement.startsWith("right")) return "width";
    if (placement.startsWith("top")) return "slide-top";
    if (placement.startsWith("bottom")) return "slide-bottom";
    if (placement.startsWith("left")) return "slide-left";
    if (placement.startsWith("right")) return "slide-right";
    if (placement === "center") return "scale-both";
  }
  return "width-height";
};

export const steup = ({ container, id, placement, target, offset, onRemoved, animation, hasTarget }: SteupProps) => {
  container.style.cssText = getStyle({ container, placement, target, offset, hasTarget });

  CurrentPopups[id].clear = async () => {
    const parent = container.parentElement;
    delete CurrentPopups[id];
    delete Components[container.id!];

    container.classList.add("opacity-out");
    parent?.querySelector("#provider-popup-overlay")?.classList.add("opacity-out");

    (container.firstChild as any)?.setAttribute("fade-type", `${animation}-out`);
    const time = getComputedStyle(document.documentElement).getPropertyValue("--popup-animation-time");
    await sleep(parseInt(time) ?? 300);
    onRemoved?.();
    Popup.render(Math.random());
    await sleep(1);
    parent?.removeAttribute("has-popup");
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
  // (container.firstChild as any)?.setAttribute("child-placement", placement);

  placement.split("-").forEach((pos) => {
    sty += getPosForTarget[pos]?.({ targetDim, containerDim });
  });
  sty += `transform:translate(${offset.x}px,${offset.y}px);`;
  return sty;
};

const getStyleWithoutTarget = ({ sty, container, placement, offset }: any) => {
  container.setAttribute("placement", placement);
  (container.firstChild as any)?.setAttribute("child-placement", placement);
  sty += getPos[placement.split("-")[0]]?.();
  sty += `transform:translate(${offset.x}px,${offset.y}px);`;
  return sty;
};

const getPos: any = {
  center: () => `inset:0;padding:100px 10px;`,
  top: () => {
    return `top:0;left:0;right:0;padding-bottom:100px;`;
  },
  bottom: () => {
    return `bottom:0;left:0;right:0;padding-top:100px;`;
  },
  left: () => {
    return `left:0;bottom:0;top:0;padding-right:100px;`;
  },
  right: () => {
    return `right:0;bottom:0;top:0;padding-left:100px;`;
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
