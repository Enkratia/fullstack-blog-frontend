export const checkRequestStatus = (isError: boolean, isSuccess: boolean, isLoading: boolean) => {
  let sendingState = {};

  if (isLoading) {
    sendingState = { "data-request-process": "" };
  } else if (isSuccess) {
    sendingState = { "data-request-success": "" };
  } else if (isError) {
    sendingState = { "data-request-warning": "" };
  }

  return sendingState;
};
