"use client";

import React from "react";

type ErrorType =
  | "FetchError"
  | "EmailOrPasswordAreIncorrect"
  | "EmailNotVerfied"
  | "EmailRegistered"
  | "";

export const useAuthErrorMessage = () => {
  const [authMessage, setAuthMessage] = React.useState({});

  const messages = {
    fetchError: {
      "data-auth-message": "Something went wrong",
    },
    accountNotExist: {
      "data-auth-message": "Email or password are incorrect",
    },
    emailNotVerfied: {
      "data-auth-message": "Email not verified",
    },
    emailRegistered: {
      "data-auth-message": "Email is already registered",
    },
    default: {
      "data-auth-message": "",
    },
  };

  const setAuthError = (error: ErrorType) => {
    switch (error) {
      case "FetchError":
        setAuthMessage(messages.fetchError);
        break;
      case "EmailOrPasswordAreIncorrect":
        setAuthMessage(messages.accountNotExist);
        break;
      case "EmailNotVerfied":
        setAuthMessage(messages.emailNotVerfied);
        break;
      case "EmailRegistered":
        setAuthMessage(messages.emailRegistered);
        break;
      default:
        setAuthMessage(messages.default);
    }
  };

  return { authMessage, setAuthError };
};
