"use client";

import React from "react";
import { useImmer } from "use-immer";

// Types
type validatePassOptions = {
  length?: number;
  resetWhenEmpty?: boolean;
  single?: boolean;
};

type validatePassLengthProps = (element: HTMLInputElement, options?: validatePassOptions) => void;

type validateTextOptions = {
  length?: number;
  type?: "list" | "normal";
};

type validateTextProps = (
  element: HTMLInputElement | HTMLTextAreaElement | null,
  idx: number,
  options?: validateTextOptions,
) => void;

// ****
const mailRegExp = /^\S+@\S+\.\S+$/;

export const useValidateForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  // **
  const [isValidText, setIsValidText] = useImmer<Record<string, string>[]>([{}]);

  // **
  const [isValidEmail, setIsValidEmail] = useImmer<Record<string, string>>({});

  // **
  const [isValidPhone, setIsValidPhone] = useImmer<Record<string, string>>({});

  // **
  const [isValidSelect, setIsValidSelect] = useImmer<Record<string, string>[]>([{}]);

  // **
  const passLengthRef = React.useRef({ value: "", comparison: false }); // store validation result
  const [isValidPassLength, setIsValidPassLength] = useImmer<Record<string, string>>({}); // store input`s value

  // **
  const passConfirmRef = React.useRef({
    value: "",
    comparison1: false,
    comparison2: false,
    comparison3: false,
  });
  const [isValidPassConfirm, setIsValidPassConfirm] = useImmer<Record<string, string>>({});

  // **
  const [isValidContent, setIsValidContent] = useImmer<Record<string, string>>({});

  // **
  const [isValidFile, setIsValidFile] = useImmer<Record<string, string>>({});

  // **
  const isValidAll = [
    isValidText,
    isValidEmail,
    isValidPhone,
    isValidSelect,
    isValidPassLength,
    isValidPassConfirm,
    isValidContent,
    isValidFile,
  ];

  const [isValidate, setIsValidate] = React.useState(false);

  // ***
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
      setIsValidContent({});
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
        draft[idx] = {};
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
  const validatePhone = (element: HTMLInputElement | null) => {
    if (!element) return;
    const value = element.value;

    const length = 13;

    // **
    if (value === null) {
      setIsValidPhone({});
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

  const validateText: validateTextProps = (element, idx, options) => {
    if (!element) return;
    const value = element.value;

    options = options ?? {};
    const length = options.length ?? 1;
    const type = options.type ?? "normal";

    // reset
    if (value === null) {
      setIsValidText((draft) => {
        draft[idx] = {};
        return draft;
      });
      return;
    }

    // **
    const matches = [];

    const isLengthMatch = value.trim().length >= length;
    matches.push(isLengthMatch);

    if (type === "list") {
      const isList = value.replace(/(\s|,)/g, "").length >= length;
      matches.push(isList);
    }

    // **
    if (matches.every((el) => el)) {
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
  const validateEmail = (element: HTMLInputElement | null) => {
    if (!element) return;
    const value = element.value;

    // **
    if (value === null) {
      setIsValidEmail({});
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
  const validatePassLength: validatePassLengthProps = (element, options) => {
    if (!element) return;
    const value = element.value;

    options = options ?? {};
    options.length = options.length ?? 5;
    options.single = options.single ?? false;
    options.resetWhenEmpty = options.resetWhenEmpty ?? false;

    const comparison = options.resetWhenEmpty
      ? value.length > options.length || value.length === 0
      : value.length > options.length;

    passLengthRef.current.value = value;
    passLengthRef.current.comparison = comparison;
    validateDeep(options.resetWhenEmpty, options.single);
  };

  // ***
  const validatePassConfirm: validatePassLengthProps = (element, options) => {
    if (!element) return;
    const value = element.value;

    options = options ?? {};
    options.resetWhenEmpty = options.resetWhenEmpty ?? false;

    passConfirmRef.current.value = value;
    validateDeep(options.resetWhenEmpty);
  };

  // *
  function validateDeep(resetWhenEmpty: boolean, single?: boolean) {
    if (resetWhenEmpty && passLengthRef.current.comparison) {
      setIsValidPassLength({});
    } else if (passLengthRef.current.comparison) {
      setIsValidPassLength({ "data-validity-success-pass": "" });
    } else {
      setIsValidPassLength({
        "data-validity-warning-pass": "Password must contain at least 6 character(s).",
      });
    }

    // **
    if (single) return;

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
      setIsValidPassConfirm({});
    } else if (passConfirmRef.current.comparison1) {
      setIsValidPassConfirm({ "data-validity-success-pass": "" });
    } else if (passConfirmRef.current.comparison2) {
      setIsValidPassConfirm({});
    } else if (passConfirmRef.current.comparison3) {
      setIsValidPassConfirm({ "data-validity-warning-pass": "Passwords do not match." });
    } else {
      setIsValidPassConfirm({});
    }
  }

  // ***
  const validateAllSuccessForm = () => {
    const inputsValidated = isValidAll.flat().filter((el) => !!Object.keys(el)?.length);
    const inputsRegistered = formRef.current?.querySelectorAll("[data-validity-register]") || [];

    if (inputsValidated.length !== inputsRegistered.length) {
      return false;
    }

    return inputsValidated.every((el) => {
      return !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success");
    });
  };

  const validateAnyWarningForm = () => {
    const inputs = isValidAll.flat();

    return inputs.every((el) => {
      return !el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning");
    });
  };

  // ***
  const formRegObj = { "data-validity-register": "" };

  function wrapObject(obj: Record<string, string>) {
    return isValidate ? { ...obj, ...formRegObj } : formRegObj;
  }

  function wrapArray(arr: Record<string, string>[]) {
    return arr.map((obj) => wrapObject(obj));
  }

  // console.log(formRef.current?.querySelectorAll("[name]"));
  // const a = formRef.current?.querySelector("[name]");
  // const b = a && (Array.from(a) as HTMLInputElement[])?.map((el) => el.value);
  // const b = a as HTMLInputElement;
  // console.log(b);

  return {
    isValidEmail: wrapObject(isValidEmail),
    validateEmail,
    isValidPassLength: wrapObject(isValidPassLength),
    validatePassLength,
    isValidText: wrapArray(isValidText),
    validateText,
    isValidPassConfirm: wrapObject(isValidPassConfirm),
    validatePassConfirm,
    isValidPhone: wrapObject(isValidPhone),
    validatePhone,
    isValidSelect: wrapArray(isValidSelect),
    validateSelect,
    isValidContent: wrapObject(isValidContent),
    validateContent,
    isValidFile: wrapObject(isValidFile),
    validateFile,

    // **
    formRef,
    setIsValidate,
    validateAllSuccessForm,
    validateAnyWarningForm,
  };
};

//////////////////////////////////////////////
//  ==== VALIDATEFORM #1 (ALL SUCCESS) ==== //
// if (!validateAllSuccessForm()) {
//   setIsValidate(true);
//   return;
// }

//  ==== VALIDATEFORM #2 (NO WARNING) ==== //
// if (!validateAnyWarningForm()) {
//   setIsValidate(true);
//   return;
// }

// "use client";

// import React from "react";
// import { useImmer } from "use-immer";

// // Types
// type validatePassOptions = {
//   length?: number;
//   resetWhenEmpty?: boolean;
//   single?: boolean;
// };

// type validatePassLengthProps = (value: string, options?: validatePassOptions) => void;

// type validateTextOptions = {
//   length?: number;
//   type?: "list" | "normal";
// };

// type validateTextProps = (value: string | null, idx: number, options?: validateTextOptions) => void;

// // ****
// const mailRegExp = /^\S+@\S+\.\S+$/;

// export const useValidateForm = () => {
//   const formRef = React.useRef<HTMLFormElement>(null);

//   // **
//   const [isValidText, setIsValidText] = useImmer<Record<string, string>[]>([{}]);

//   // **
//   const [isValidEmail, setIsValidEmail] = useImmer<Record<string, string>>({});

//   // **
//   const [isValidPhone, setIsValidPhone] = useImmer<Record<string, string>>({});

//   // **
//   const [isValidSelect, setIsValidSelect] = useImmer<Record<string, string>[]>([{}]);

//   // **
//   const passLengthRef = React.useRef({ value: "", comparison: false }); // store validation result
//   const [isValidPassLength, setIsValidPassLength] = useImmer<Record<string, string>>({}); // store input`s value

//   // **
//   const passConfirmRef = React.useRef({
//     value: "",
//     comparison1: false,
//     comparison2: false,
//     comparison3: false,
//   });
//   const [isValidPassConfirm, setIsValidPassConfirm] = useImmer<Record<string, string>>({});

//   // **
//   const [isValidContent, setIsValidContent] = useImmer<Record<string, string>>({});

//   // **
//   const [isValidFile, setIsValidFile] = useImmer<Record<string, string>>({});

//   // **
//   const isValidAll = [
//     isValidText,
//     isValidEmail,
//     isValidPhone,
//     isValidSelect,
//     isValidPassLength,
//     isValidPassConfirm,
//     isValidContent,
//     isValidFile,
//   ];

//   const [isValidate, setIsValidate] = React.useState(false);

//   // ***
//   const validateFile = (files: FileList | null) => {
//     const filesCount = files && files.length === 1;

//     if (filesCount) {
//       setIsValidFile({ "data-validity-success-file": "" });
//     } else {
//       setIsValidFile({ "data-validity-warning-file": "File not selected" });
//     }
//   };

//   // ***
//   const validateContent = (text: string | undefined) => {
//     // **
//     if (text === null) {
//       setIsValidContent({});
//       return;
//     }

//     // **
//     const isNotEmpty = text?.trim();

//     if (isNotEmpty) {
//       setIsValidContent({ "data-validity-success": "" });
//     } else {
//       setIsValidContent({ "data-validity-warning": "" });
//     }
//   };

//   // ***
//   const validateSelect = (option: HTMLLIElement | null, idx: number) => {
//     if (option === null) {
//       setIsValidSelect((draft) => {
//         draft[idx] = {};
//         return draft;
//       });
//       return;
//     }

//     // **
//     const list = option.parentElement;
//     const isFirstChild = option === list?.firstElementChild;

//     if (isFirstChild) {
//       setIsValidSelect((draft) => {
//         draft[idx] = { "data-validity-warning": "Option not selected." };
//         return draft;
//       });
//     } else {
//       setIsValidSelect((draft) => {
//         draft[idx] = { "data-validity-success": "" };
//         return draft;
//       });
//     }
//   };

//   // ***
//   const validatePhone = (value: string | null) => {
//     const length = 13;

//     // **
//     if (value === null) {
//       setIsValidPhone({});
//       return;
//     }

//     // **
//     const isRightLength = value.length === length;

//     if (isRightLength) {
//       setIsValidPhone({ "data-validity-success": "" });
//     } else {
//       setIsValidPhone({ "data-validity-warning": "" });
//     }
//   };

//   const validateText: validateTextProps = (value, idx, options) => {
//     options = options ?? {};
//     const length = options.length ?? 1;
//     const type = options.type ?? "normal";

//     // reset
//     if (value === null) {
//       setIsValidText((draft) => {
//         draft[idx] = {};
//         return draft;
//       });
//       return;
//     }

//     // **
//     const matches = [];

//     const isLengthMatch = value.trim().length >= length;
//     matches.push(isLengthMatch);

//     if (type === "list") {
//       const isList = value.replace(/(\s|,)/g, "").length >= length;
//       matches.push(isList);
//     }

//     // **
//     if (matches.every((el) => el)) {
//       setIsValidText((draft) => {
//         draft[idx] = { "data-validity-success": "" };
//         return draft;
//       });
//     } else {
//       setIsValidText((draft) => {
//         draft[idx] = {
//           "data-validity-warning": `Field must contain at least ${length} character(s).`,
//         };
//         return draft;
//       });
//     }
//   };

//   // ***
//   const validateEmail = (value: string | null) => {
//     // **
//     if (value === null) {
//       setIsValidEmail({});
//       return;
//     }

//     // **
//     const isMatched = value.search(mailRegExp) !== -1;

//     if (isMatched) {
//       setIsValidEmail({ "data-validity-success": "" });
//     } else {
//       setIsValidEmail({ "data-validity-warning": "Email must contain «@» and «.»" });
//     }
//   };

//   // ***
//   const validatePassLength: validatePassLengthProps = (value, options) => {
//     options = options ?? {};
//     options.length = options.length ?? 5;
//     options.single = options.single ?? false;
//     options.resetWhenEmpty = options.resetWhenEmpty ?? false;

//     const comparison = options.resetWhenEmpty
//       ? value.length > options.length || value.length === 0
//       : value.length > options.length;

//     passLengthRef.current.value = value;
//     passLengthRef.current.comparison = comparison;
//     validateDeep(options.resetWhenEmpty, options.single);
//   };

//   // ***
//   const validatePassConfirm: validatePassLengthProps = (value, options) => {
//     options = options ?? {};
//     options.resetWhenEmpty = options.resetWhenEmpty ?? false;

//     passConfirmRef.current.value = value;
//     validateDeep(options.resetWhenEmpty);
//   };

//   // *
//   function validateDeep(resetWhenEmpty: boolean, single?: boolean) {
//     if (resetWhenEmpty && passLengthRef.current.comparison) {
//       setIsValidPassLength({});
//     } else if (passLengthRef.current.comparison) {
//       setIsValidPassLength({ "data-validity-success-pass": "" });
//     } else {
//       setIsValidPassLength({
//         "data-validity-warning-pass": "Password must contain at least 6 character(s).",
//       });
//     }

//     // **
//     if (single) return;

//     passConfirmRef.current.comparison1 =
//       passLengthRef.current.comparison &&
//       passLengthRef.current.value === passConfirmRef.current.value;

//     passConfirmRef.current.comparison2 =
//       !passLengthRef.current.comparison &&
//       passLengthRef.current.value === passConfirmRef.current.value;

//     passConfirmRef.current.comparison3 =
//       passLengthRef.current.comparison &&
//       passLengthRef.current.value !== passConfirmRef.current.value;

//     if (resetWhenEmpty && passConfirmRef.current.comparison1) {
//       setIsValidPassConfirm({});
//     } else if (passConfirmRef.current.comparison1) {
//       setIsValidPassConfirm({ "data-validity-success-pass": "" });
//     } else if (passConfirmRef.current.comparison2) {
//       setIsValidPassConfirm({});
//     } else if (passConfirmRef.current.comparison3) {
//       setIsValidPassConfirm({ "data-validity-warning-pass": "Passwords do not match." });
//     } else {
//       setIsValidPassConfirm({});
//     }
//   }

//   // ***
//   const validateAllSuccessForm = () => {
//     const inputsValidated = isValidAll.flat().filter((el) => !!Object.keys(el)?.length);
//     const inputsRegistered = formRef.current?.querySelectorAll("[data-validity-register]") || [];

//     if (inputsValidated.length !== inputsRegistered.length) {
//       return false;
//     }

//     return inputsValidated.every((el) => {
//       return !el ? !!el : Object.keys(el)?.[0]?.includes("data-validity-success");
//     });
//   };

//   const validateAnyWarningForm = () => {
//     const inputs = isValidAll.flat();

//     return inputs.every((el) => {
//       return !el ? !el : !Object.keys(el)?.[0]?.includes("data-validity-warning");
//     });
//   };

//   // ***
//   const formRegObj = { "data-validity-register": "" };

//   function wrapObject(obj: Record<string, string>) {
//     return isValidate ? { ...obj, ...formRegObj } : formRegObj;
//   }

//   function wrapArray(arr: Record<string, string>[]) {
//     return arr.map((obj) => wrapObject(obj));
//   }

//   // console.log(formRef.current?.querySelectorAll("[name]"));
//   // const a = formRef.current?.querySelector("[name]");
//   // const b = a && (Array.from(a) as HTMLInputElement[])?.map((el) => el.value);
//   // const b = a as HTMLInputElement;
//   // console.log(b);

//   return {
//     isValidEmail: wrapObject(isValidEmail),
//     validateEmail,
//     isValidPassLength: wrapObject(isValidPassLength),
//     validatePassLength,
//     isValidText: wrapArray(isValidText),
//     validateText,
//     isValidPassConfirm: wrapObject(isValidPassConfirm),
//     validatePassConfirm,
//     isValidPhone: wrapObject(isValidPhone),
//     validatePhone,
//     isValidSelect: wrapArray(isValidSelect),
//     validateSelect,
//     isValidContent: wrapObject(isValidContent),
//     validateContent,
//     isValidFile: wrapObject(isValidFile),
//     validateFile,

//     // **
//     formRef,
//     setIsValidate,
//     validateAllSuccessForm,
//     validateAnyWarningForm,
//   };
// };
