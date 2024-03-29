export const checkRequestStatus = (isError: boolean, isSuccess: boolean, isLoading: boolean) => {
  let sendingState = {};

  if (isLoading) {
    sendingState = { "data-request-process": "Data is sent..." };
  } else if (isSuccess) {
    sendingState = { "data-request-success": "Data sent" };
  } else if (isError) {
    sendingState = { "data-request-warning": "Failed to send data" };
  }

  return sendingState;
};
