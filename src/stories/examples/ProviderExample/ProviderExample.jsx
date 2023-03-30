import React from "react";
import { PopupContainer } from "../Lib";
import TestProvider from "./TestProvider";

const ProviderExample = () => {
  return (
    <div>
      <h1>PopupExample</h1>
      <TestProvider />
      <PopupContainer />
    </div>
  );
};

export default ProviderExample;
