"use client";

import React from "react";

import { ResetContext } from "../../utils/contexts";

type TestLayerProps = {
  children: any;
};

export const ResetProvider: React.FC<TestLayerProps> = ({ children }) => {
  const [key, setKey] = React.useState(0);

  return (
    <div>
      <ResetContext.Provider key={key} value={setKey}>
        {children}
      </ResetContext.Provider>
    </div>
  );
};
