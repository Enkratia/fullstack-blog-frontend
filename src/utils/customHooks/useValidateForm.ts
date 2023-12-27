import React from "react";
import { useImmer } from "use-immer";

// Types
type validatePassOptions = {
  length?: number;
  resetWhenEmpty?: boolean;
};

type validatePassLengthProps = (value: string, options?: validatePassOptions) => void;

// ****
const mailRegExp = /^\S+@\S+\.\S+$/;

export const useValidateForm = () => {
  const [isValidText, setIsValidText] = useImmer<Record<string, string>[]>([]);

  // **
  const [isValidEmail, setIsValidEmail] = useImmer<Record<string, string>>({ "": "" });

  // **
  const [isValidPhone, setIsValidPhone] = useImmer<Record<string, string>>({ "": "" });

  // **
  const [isValidSelect, setIsValidSelect] = useImmer<Record<string, string>[]>([]);

  // **
  const passLengthRef = React.useRef({ value: "", comparison: false }); // store validation result
  const [isValidPassLength, setIsValidPassLength] = useImmer<Record<string, string>>({ "": "" }); // store input`s value

  // **
  const passConfirmRef = React.useRef({
    value: "",
    comparison1: false,
    comparison2: false,
    comparison3: false,
  });
  const [isValidPassConfirm, setIsValidPassConfirm] = useImmer<Record<string, string>>({ "": "" });

  // **
  const [isValidContent, setIsValidContent] = useImmer<Record<string, string>>({ "": "" });

  // **
  const [isValidFile, setIsValidFile] = useImmer<Record<string, string>>({ "": "" });

  const validateFile = (files: FileList | null) => {
    const filesCount = files && files.length === 1;

    if (filesCount) {
      setIsValidFile({ "data-validity-success-file": "" });
    } else {
      setIsValidFile({ "data-validity-warning-file": "File not selected" });
    }
  };

  // ***
  const validateContent = (text: string | undefined) => {
    // **
    if (text === null) {
      setIsValidContent({ "": "" });
      return;
    }

    // **
    const isNotEmpty = text?.trim();

    if (isNotEmpty) {
      setIsValidContent({ "data-validity-success": "" });
    } else {
      setIsValidContent({ "data-validity-warning": "" });
    }
  };

  // ***
  const validateSelect = (option: HTMLLIElement | null, idx: number) => {
    if (option === null) {
      setIsValidSelect((draft) => {
        draft[idx] = { "": "" };
        return draft;
      });
      return;
    }

    // **
    const list = option.parentElement;
    const isFirstChild = option === list?.firstElementChild;

    if (isFirstChild) {
      setIsValidSelect((draft) => {
        draft[idx] = { "data-validity-warning": "Option not selected." };
        return draft;
      });
    } else {
      setIsValidSelect((draft) => {
        draft[idx] = { "data-validity-success": "" };
        return draft;
      });
    }
  };

  // ***
  const validatePhone = (value: string | null) => {
    const length = 15;

    // **
    if (value === null) {
      setIsValidPhone({ "": "" });
      return;
    }

    // **
    const isRightLength = value.length === length;

    if (isRightLength) {
      setIsValidPhone({ "data-validity-success": "" });
    } else {
      setIsValidPhone({ "data-validity-warning": "" });
    }
  };

  const validateText = (value: string | null, idx: number) => {
    const length = 1;

    // **
    if (value === null) {
      setIsValidText((draft) => {
        draft[idx] = { "": "" };
        return draft;
      });
      return;
    }

    // **
    const isNotEmpty = value.trim().length >= length;

    if (isNotEmpty) {
      setIsValidText((draft) => {
        draft[idx] = { "data-validity-success": "" };
        return draft;
      });
    } else {
      setIsValidText((draft) => {
        draft[idx] = {
          "data-validity-warning": `Field must contain at least ${length} character(s).`,
        };
        return draft;
      });
    }
  };

  // ***
  const validateEmail = (value: string | null) => {
    // **
    if (value === null) {
      setIsValidEmail({ "": "" });
      return;
    }

    // **
    const isMatched = value.search(mailRegExp) !== -1;

    if (isMatched) {
      setIsValidEmail({ "data-validity-success": "" });
    } else {
      setIsValidEmail({ "data-validity-warning": "Email must contain «@» and «.»" });
    }
  };

  // ***
  const validatePassLength: validatePassLengthProps = (value, options) => {
    options = options ?? {};
    options.length = options.length ?? 5;
    options.resetWhenEmpty = options.resetWhenEmpty ?? false;

    const comparison = options.resetWhenEmpty
      ? value.length > options.length || value.length === 0
      : value.length > options.length;

    passLengthRef.current.value = value;
    passLengthRef.current.comparison = comparison;
    validateDeep(options.resetWhenEmpty);
  };

  // ***
  const validatePassConfirm: validatePassLengthProps = (value, options) => {
    options = options ?? {};
    options.resetWhenEmpty = options.resetWhenEmpty ?? false;

    passConfirmRef.current.value = value;
    validateDeep(options.resetWhenEmpty);
  };

  // *
  function validateDeep(resetWhenEmpty: boolean) {
    if (resetWhenEmpty && passLengthRef.current.comparison) {
      setIsValidPassLength({ "": "" });
    } else if (passLengthRef.current.comparison) {
      setIsValidPassLength({ "data-validity-success-pass": "" });
    } else {
      setIsValidPassLength({
        "data-validity-warning-pass": "Password must contain at least 6 character(s).",
      });
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

    if (resetWhenEmpty && passConfirmRef.current.comparison1) {
      setIsValidPassConfirm({ "": "" });
    } else if (passConfirmRef.current.comparison1) {
      setIsValidPassConfirm({ "data-validity-success-pass": "" });
    } else if (passConfirmRef.current.comparison2) {
      setIsValidPassConfirm({ "": "" });
    } else if (passConfirmRef.current.comparison3) {
      setIsValidPassConfirm({ "data-validity-warning-pass": "Passwords do not match." });
    } else {
      setIsValidPassConfirm({ "": "" });
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
    isValidFile,
    validateFile,
  };
};

//  ==== VALIDATEFORM #1 (ALL SUCCESS) ==== //
// const validateForm = () => {
//   return [isValidEmail, isValidPassLength].every((el) =>
//     !el ? !!el : Object.keys(el)[0].includes("data-validity-success"),
//   );
// };

//  ==== VALIDATEFORM #2 (NO WARNING) ==== //
// const validateForm = () => {
//   return [isValidText[0], isValidEmail, isValidPassLength, isValidPassConfirm].every((el) =>
//     !el ? !!el : !Object.keys(el)[0].includes("data-validity-warning"),
//   );
// };
