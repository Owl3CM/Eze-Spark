import React, { useState } from "react";
import { Popup, PopupOptions, PopupMe } from "../../lib";
import { JsonBuilder } from "morabaa-utils";
import { Button } from "../components";
import Input from "./Input";

const Component = ({ remove, id }: any) => {
  return (
    <div>
      {id}
      <p className="p-x">LOOOOOOOOOL</p>
      {/* {remove && <Button title="Remove" onClick={remove} />}
      <Tester /> */}
    </div>
  );
};

const _PopupOptions: PopupOptions = {
  id: "test",
  Component: Component,
  placement: "center",
  animation: "width-height",
  childClass: "child-class",
  removeOnOutClick: true,
  // overlay: true,
  overlayClass: "overlay-class",
};

let change = (value: any) => {};

// Animation = "width" | "height" | "width-height" | "scale-x" | "scale-y" | "scale-both" | "auto" | "none";
const popupPlacement = ["auto", "inside", "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right", "none"];
const animation = ["width", "height", "width-height", "scale-x", "scale-y", "scale-both", "auto", "none"];
const removeOnOutClick = ["true", "false"];

const Targets = Array(7).fill("click me");
type Props = {};

const Tester = ({}: Props) => {
  const [, render] = useState(0);
  change = React.useCallback(({ key, value }: { key: keyof PopupOptions; value: any }) => {
    _PopupOptions[key] = value;
    render((prev) => prev + 1);
  }, []);

  return (
    <div className="col gap-x p-l" style={{ height: "90vh" }}>
      <div className="mx-auto row-center gap-2x">
        {/* <JsonBuilder json={_PopupOptions} /> */}
        <ButtonsContainer title="placement" options={popupPlacement} />
        <ButtonsContainer title="animation" options={animation} />
        <ButtonsContainer title="removeOnOutClick" options={removeOnOutClick} />
      </div>
      <div className="m-auto text-x">
        <Button
          title="Show Popup"
          onClick={() => {
            let id = `${Math.random()}`;
            PopupMe({
              ..._PopupOptions,
              id,
              componentProps: {
                remove: () => {
                  Popup.remove(id);
                },
                id,
              },
            });
          }}
        />
      </div>
      <div className="m-auto text-x bg-lord p-l">
        <Button
          title="Show Popup Inside Me!"
          onClick={(e) => {
            let id = `${Math.random()}`;
            PopupMe({
              ..._PopupOptions,
              id,
              target: e.currentTarget.parentElement,
              componentProps: {
                remove: () => {
                  Popup.remove(id);
                },
                id,
              },
            });
          }}
        />
      </div>
      <div className="col justify-around h-full flex-grow gap-x">
        <OptionsViewer
          title="targets"
          options={Targets}
          onClick={(e: any, i) => {
            let id = `${i}`;
            let placement = _PopupOptions.placement === "center" ? "auto" : _PopupOptions.placement;
            PopupMe({ ..._PopupOptions, target: e.currentTarget.parentElement, placement, id });
          }}
        />

        <OptionsViewer
          title="targets"
          options={Targets}
          onClick={(e: any, i) => {
            let id = `${i}`;
            let placement = _PopupOptions.placement === "center" ? "auto" : _PopupOptions.placement;
            PopupMe({ ..._PopupOptions, target: e.currentTarget.parentElement, placement, id });
          }}
        />
      </div>
    </div>
  );
};

export default Tester;

interface ButtonsContainerProps {
  title: string;
  options: string[];
  onClick?: (value: string) => void;
}

const ButtonsContainer = ({ title, options, onClick }: ButtonsContainerProps) => (
  <div
    className="text-center text-2x text-shark bg-prim py-m px-3x round-l"
    onClick={() => {
      PopupMe({
        animation: "width-height",
        Component: (
          <div className="gap-x round-l col p-x">
            {options.map((value, i) => {
              return (
                <Button
                  key={i}
                  onClick={(e: any) => {
                    if (onClick) onClick(e);
                    else {
                      change({ key: title, value });
                      Popup.remove("test");
                    }
                  }}
                  selected={(_PopupOptions as any)[title] === value}
                  title={value}
                />
              );
            })}
          </div>
        ),
        id: "test",
        placement: "center",
        overlay: true,
      });
    }}>
    {title}
  </div>
);

interface InputContainerProps {
  title: string;
  value: string;
  onChange: (value: any) => void;
}

const InputContainer = ({ title, value, onChange }: InputContainerProps) => (
  <div className="bg-king p-l round-l">
    <h1 className="text-center text-2x text-shark">{title}</h1>
    <div className="row-center gap-x grid-out">
      <Input value={value} onChange={onChange} title={title} />
    </div>
  </div>
);

interface OptionsViewerProps {
  title: string;
  options: string[];
  onClick?: (e: any, i: number) => void;
}

const OptionsViewer = ({ options, title, onClick }: OptionsViewerProps) => {
  return (
    <div className="gap-x round-l wrap justify-around p-x">
      {options.map((value, i) => {
        return (
          <div key={i} className="bg-lord">
            <Button
              onClick={(e: any) => {
                if (onClick) onClick(e, i);
                else change({ key: title, value });
              }}
              selected={(_PopupOptions as any)[title] === value}
              title={value}
            />
          </div>
        );
      })}
    </div>
  );
};
