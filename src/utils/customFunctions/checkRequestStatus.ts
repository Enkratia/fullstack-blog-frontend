export const checkRequestStatus = (isError: boolean, isSuccess: boolean, isLoading: boolean) => {
  let sendingState = "";

  if (isLoading) {
    sendingState = "btnWrapperProcess";
  } else if (isSuccess) {
    sendingState = "btnWrapperSuccess";
  } else if (isError) {
    sendingState = "btnWrapperWarning";
  }

  return sendingState;
};
