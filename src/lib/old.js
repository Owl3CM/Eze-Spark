import React from "react";

const CurrentPopups = {};

export const Popup = {
  create: ({ component: Component, id = "gloable", removeOnMouseUp = false, position = "center", overlay, target, componentProps = {} }) => {
    console.log(typeof Component, "Component");
    if (typeof Component === "function") Component = <Component {...componentProps} />;

    Popup.set({ target, component: Component, removeOnMouseUp, position, overlay, id });
    return () => Popup.remove(id);
  },
  remove: ({ id = "gloable" }) => {
    CurrentPopups[id]?.clear();
  },
  clear: () => {
    Object.keys(CurrentPopups).forEach((key) => CurrentPopups[key]?.clear());
  }
};

export const PopupContainer = React.memo(({ containerClass = "" }) => {
  [Popup.state, Popup.set] = React.useState(null);
  return React.useMemo(() => {
    if (!Popup.state) return null;
    const extarClass = ` ${Popup.state.overlay ? "overlay" : ""} ${Popup.state.position === "center" ? "center" : ""}`;
    const className = `popup-container ${containerClass} ${extarClass}`;

    return (
      <div className={className} ref={(ref) => ref && handleShowPopup(ref)}>
        <div className='popup-child'>{Popup.state.component}</div>
      </div>
    );
  }, [Popup.state]);
});

const handleShowPopup = (ref) => {
  const { target, position, id, overlay, removeOnMouseUp } = Popup.state;
  const container = getClone(ref, target, id, overlay);

  CurrentPopups[id]?.clear();
  CurrentPopups[id] = container;

  if (!target) document.body.append(container);
  else {
    handlePostion(container, target, position);
    target.append(container);
  }
  removeOnMouseUp && window.addEventListener("mouseup", () => Popup.remove(id));
};

const handlePostion = (container, target, position) => {
  if (container.classList.includes("center")) return;

  target.style.position = "relative";
  const { height, width } = target.getBoundingClientRect();
  container.style = `postion:absolute;${position.includes("top") ? "bottom" : "top" + `:${height}px;`} ${
    position.includes("left") ? `right: ${0}px;` : `left: ${width}px;`
  } `;
};

const getClone = (ref, target, id, overlay) => {
  const container = ref.cloneNode(true);
  Popup.set(null);
  container.style.display = "";
  container.onanimationend = () => {
    if (container.classList.contains("pop-out")) {
      target && (target.style.position = "");
      container.remove();
    }
  };
  container.clear = () => {
    CurrentPopups[id] = null;
    container.classList.add("pop-out");
  };
  return container;
};

// @layer popup {
// .popup-container{
//   --popup-blur: #FFFFFF22;
//   --animation-delay: 0.2s;
//   z-index: 30000;
//   padding: 100px var(--md);
//   flex-direction: column;
//   overflow-y: auto;
//   display: flex;
//   position: absolute;
//   animation: pop-in-frame var(--animation-delay) ease-in-out;
// }
// .dark .popup-container{
//   --popup-blur: #2d303e22;
// }
// .center{
//   /* pointer-events: none; */
// }

// .popup-overlay{
//   inset: 0;
//   background-color:var(--popup-blur);
//   backdrop-filter: blur(2px);
//   animation:  overlay-in var(--animation-delay);
// }

// .pop-out{
//   opacity: 0;
//   scale: 0;
//   animation: pop-out-frame var(--animation-delay) ease-in-out;
// }
// .popup-overlay.pop-out{
//   scale: 1;
//   animation: overlay-out var(--animation-delay) ease-in-out;
// }

// .popup-container .popup-child{
//   margin: auto;
//   gap: var(--md);
//   animation: popup-fade var(--animation-delay);
//   background-color: rebeccapurple;
//   max-width: 720px;
//   width: 100%;
//   /* pointer-events: all; */
// }

// @keyframes overlay-in {
//   0% {
//       background-color:#ccc0;
//       backdrop-filter: blur(0px);
//   }
//   100% {
//       background-color:var(--popup-blur);
//       backdrop-filter: blur(2px);
//   }
// }

// @keyframes overlay-out {
//   0% {
//       opacity: 1;
//       background-color:var(--popup-blur);
//       backdrop-filter: blur(2px);
//   }
//   100% {
//       opacity: 0;
//       background-color:#ccc0;
//       backdrop-filter: blur(0px);
//   }
// }

// @keyframes popup-fade {
//   0% {
//       opacity: 0;
//       transform:scale(1,0.5) translateY(700px)
//   }
//   70% {
//       transform: translateY(-20px) skewY(-5deg);

//   }
//   100% {
//       opacity: 1;
//       transform:scale(1) translateY(0) skewY(0);
//   }
// }

// @keyframes pop-in-frame {
//   0% {
//       opacity: 0;
//       scale: 0;
//       transform: translateX(100vw);
//   }
//   50% {
//       scale: 0;
//   }
//   100% {
//       scale: 1;
//       opacity: 1;
//       transform: translateX(0);
//   }
// }

// @keyframes pop-out-frame {
//   0% {
//       opacity: 1;
//       scale: 1;
//       transform: translateX(0);
//   }
//   50% {
//       opacity: 0;
//       scale: 0;
//   }
//   100% {
//       scale: 0;
//       transform: translateX(100vw);
//   }
// }
// }
