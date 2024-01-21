"use client";

import React from "react";

import { ResetContext } from "../../utils/contexts";

type TestLayerProps = {
  children: any;
};

export const ResetProvider: React.FC<TestLayerProps> = ({ children }) => {
  const [key, setKey] = React.useState(0);

  const reInitApp = () => {
    setKey((n) => n + 1);
  };

  return (
    <>
      <ResetContext.Provider key={key} value={reInitApp}>
        {children}
      </ResetContext.Provider>
    </>
  );
};
