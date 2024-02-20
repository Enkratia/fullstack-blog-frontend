type ToastInitialStateInfoType = {
  allArgs: string[];
  allTexts: string[];
  allTypes: ToastTypeType[];
};

export type ToastInitialStateType = {
  toastInfo: ToastInitialStateInfoType;
};

export type ToastPayload = {
  args: string | string[];
  text: string | string[];
  type: ToastTypeType | ToastTypeType[];
};
