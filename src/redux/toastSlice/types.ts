type ToastTypes = ["warning", "error", "info", "success", undefined];

export type ToastType = {
  requestIds: string[];
  text: string;
  type: ToastTypes[number];
};

export type ToastPayload = {
  requestId: string;
  text: string;
  type: ToastTypes[number];
};
