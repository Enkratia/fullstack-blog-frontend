"use client";

import { useContext } from "react";

import { ReinitAppContext } from "../contexts";

export const useReinitApp = () => {
  return useContext(ReinitAppContext);
};
