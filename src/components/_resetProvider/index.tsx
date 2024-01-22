"use client";

import React from "react";

import { ReinitAppContext } from "../../utils/contexts";

type TestLayerProps = {
  children: any;
};

export const ReinitAppProvider: React.FC<TestLayerProps> = ({ children }) => {
  const [key, setKey] = React.useState(0);

  const reinitApp = () => {
    setKey((n) => n + 1);
  };

  return (
    <>
      <ReinitAppContext.Provider key={key} value={reinitApp}>
        {children}
      </ReinitAppContext.Provider>
    </>
  );
};
