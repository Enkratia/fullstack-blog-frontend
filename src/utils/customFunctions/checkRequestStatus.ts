export const checkRequestStatus = (
  isError: boolean,
  isSuccess: boolean,
  isFetching: boolean,
  isLoading: boolean,
) => {
  let sendingState = "";

  if (isFetching || isLoading) {
    sendingState = "btnWrapperProcess";
  } else if (isSuccess) {
    sendingState = "btnWrapperSuccess";
  } else if (isError) {
    sendingState = "btnWrapperWarning";
  }

  return sendingState;
};
