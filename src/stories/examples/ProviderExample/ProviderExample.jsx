import React from "react";
import { ProviderContainer, PrintMe } from "../Lib";
import TestProvider from "./TestProvider";

const ProviderExample = () => {
  return (
    <div>
      <h1>PopupExample</h1>
      <TestProvider />
      <ProviderContainer />
      <p
        className="button"
        onClick={() => {
          PrintMe({
            Component: PrintComponent,
            componentProps: { text: "TestProvider" },
          });
        }}
      >
        print
      </p>
    </div>
  );
};

export default ProviderExample;

const PrintComponent = ({ text = "TEXT" }) => {
  return (
    <div className="bg-white text-black">
      <p>text</p>
    </div>
  );
};
