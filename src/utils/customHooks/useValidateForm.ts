import React from "react";
import { useImmer } from "use-immer";

const mailRegExp = /^\S+@\S+\.\S+$/;

export const useValidateForm = () => {
  const [isValidText, setIsValidText] = useImmer<string[]>([]);

  // **
  const [isValidEmail, setIsValidEmail] = useImmer("");

  // **
  const [isValidPhone, setIsValidPhone] = useImmer("");

  // **
  const [isValidSelect, setIsValidSelect] = useImmer<string[]>([]);

  // **
  const passLengthRef = React.useRef({ value: "", comparison: false }); // store validation result
  const [isValidPassLength, setIsValidPassLength] = useImmer(""); // store input`s value

  // **
  const passConfirmRef = React.useRef({
    value: "",
    comparison1: false,
    comparison2: false,
    comparison3: false,
  });
  const [isValidPassConfirm, setIsValidPassConfirm] = useImmer("");

  // **
  const [isValidContent, setIsValidContent] = useImmer("");

  // ***
  const validateContent = (text: string | null) => {
    // **
    if (text === null) {
      setIsValidContent("");
      return;
    }

    // **
    const isNotEmpty = text.trim();

    if (isNotEmpty) {
      setIsValidContent("inputWrapperSuccess");
    } else {
      setIsValidContent("inputWrapperWarning");
    }
  };

  // ***
  const validateSelect = (option: HTMLLIElement | null, idx: number) => {
    if (option === null) {
      setIsValidSelect((draft) => {
        draft[idx] = "";
        return draft;
      });
      return;
    }

    // **
    const list = option.parentElement;
    const isFirstChild = option === list?.firstElementChild;

    if (isFirstChild) {
      setIsValidSelect((draft) => {
        draft[idx] = "inputWrapperWarning";
        return draft;
      });
    } else {
      setIsValidSelect((draft) => {
        draft[idx] = "inputWrapperSuccess";
        return draft;
      });
    }
  };

  // ***
  const validatePhone = (value: string | null) => {
    // **
    if (value === null) {
      setIsValidPhone("");
      return;
    }

    // **
    const is15Chars = value.length === 15;

    if (is15Chars) {
      setIsValidPhone("inputWrapperSuccess");
    } else {
      setIsValidPhone("inputWrapperWarning");
    }
  };

  // ***
  const validateText = (value: string | null, idx: number) => {
    // **
    if (value === null) {
      setIsValidText((draft) => {
        draft[idx] = "";
        return draft;
      });
      return;
    }

    // **
    const isNotEmpty = value.trim().length > 0;

    if (isNotEmpty) {
      setIsValidText((draft) => {
        draft[idx] = "inputWrapperSuccess";
        return draft;
      });
    } else {
      setIsValidText((draft) => {
        draft[idx] = "inputWrapperWarning";
        return draft;
      });
    }
  };

  // ***
  const validateEmail = (value: string | null) => {
    // **
    if (value === null) {
      setIsValidEmail("");
      return;
    }

    // **
    const isMatched = value.search(mailRegExp) !== -1;

    if (isMatched) {
      setIsValidEmail("inputWrapperSuccess");
    } else {
      setIsValidEmail("inputWrapperWarning");
    }
  };

  // ***
  const validatePassLength = (value: string) => {
    passLengthRef.current.value = value;
    passLengthRef.current.comparison = value.length > 5;
    validateDeep();
  };

  // ***
  const validatePassConfirm = (value: string) => {
    passConfirmRef.current.value = value;
    validateDeep();
  };

  // *
  function validateDeep() {
    if (passLengthRef.current.comparison) {
      setIsValidPassLength("inputWrapperSuccess");
    } else {
      setIsValidPassLength("inputWrapperWarning");
    }

    passConfirmRef.current.comparison1 =
      passLengthRef.current.comparison &&
      passLengthRef.current.value === passConfirmRef.current.value;

    passConfirmRef.current.comparison2 =
      !passLengthRef.current.comparison &&
      passLengthRef.current.value === passConfirmRef.current.value;

    passConfirmRef.current.comparison3 =
      passLengthRef.current.comparison &&
      passLengthRef.current.value !== passConfirmRef.current.value;

    if (passConfirmRef.current.comparison1) {
      setIsValidPassConfirm("inputWrapperSuccess");
    } else if (passConfirmRef.current.comparison2) {
      setIsValidPassConfirm("");
    } else if (passConfirmRef.current.comparison3) {
      setIsValidPassConfirm("inputWrapperWarning");
    } else {
      setIsValidPassConfirm("");
    }
  }

  return {
    isValidEmail,
    validateEmail,
    isValidPassLength,
    validatePassLength,
    isValidText,
    validateText,
    isValidPassConfirm,
    validatePassConfirm,
    isValidPhone,
    validatePhone,
    isValidSelect,
    validateSelect,
    isValidContent,
    validateContent,
  };
};
