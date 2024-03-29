"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateContactUsMessageMutation } from "../../../redux/backendApi";

import { FormInput, FormSelect, FormSubmit, FormTextarea } from "../../../components";
import { checkRequestStatus, toArray } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./contactUsForm.module.scss";

const placeholder = "Query Related";

const FormSchema = z.object({
  fullname: z
    .string()
    .min(2, "Fullname should be atleast 2 characters")
    .max(45, "Fullname must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(2, "Message should be atleast 2 characters"),
  query: z.string().min(1, "Please choose an option"),
});

type InputType = z.infer<typeof FormSchema>;

type ContactUsFormProps = {
  queries: ContactUsQueriesType;
};

export const ContactUsForm: React.FC<ContactUsFormProps> = ({ queries: queriesData }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [activeOption, setActiveOption] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, submitCount },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const [createMessage, { isError, isSuccess, isLoading }] = useCreateContactUsMessageMutation();
  const requestStatus = checkRequestStatus(isError, isSuccess, isLoading);

  // **
  const onSelectValidation = (option: number, options: string[]) => {
    setValue("query", option ? options[option] : "", {
      shouldValidate: !!submitCount,
    });
  };

  const onSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    createMessage(formData);
  };

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <FormInput
        isPass={false}
        classNameWrapper={s.inputWrapper}
        classNameInput={cs.input}
        error={errors?.fullname?.message}
        register={register}
        name="fullname"
        type="text"
        placeholder="Full Name"
      />

      <FormInput
        isPass={false}
        classNameWrapper={s.inputWrapper}
        classNameInput={cs.input}
        error={errors?.email?.message}
        register={register}
        name="email"
        type="text"
        placeholder="Your Email"
      />

      <FormSelect
        classNameWrapper={s.inputWrapper}
        classNameInput={cs.input}
        error={errors?.query?.message}
        name="query"
        placeholder={placeholder}
        onSelectValidation={onSelectValidation}
        options={toArray(queriesData)}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        register={register}
      />

      <FormTextarea
        classNameWrapper={s.inputWrapper}
        classNameTextarea={`${s.textarea} ${cs.input}`}
        error={errors?.message?.message}
        register={register}
        name="message"
        placeholder="Message"
      />

      <FormSubmit
        classNameWrapper=""
        classNameBtn={`${s.submit} ${cs.btn} ${cs.btnLg}`}
        text="Send Message"
        requestStatus={requestStatus}
      />
    </form>
  );
};

//////////////////////////////////////////////////////////////////////////
// **
/* <Controller
              control={control}
              // name="accepted"
              name="query"
              render={({ field: { value, onChange } }) => ( */

/* <Controller
              name="query"
              control={control}
              render={({ field: { value } }) => <input value={value} />}
            /> */

// onChange={onChange}
// name="query"
// defaultValue={active === 0 ? "" : queries[active]}

/* )}
            /> */

// **

/* <div className={`${s.inputWrapper} ${cs.inputWrapper}`} {...isValidText[1]}> */

/* <FormInput
        element="input"
        type="text"
        onChange={() => validateText(2)}
        placeholder="test placeholder"
        name="test"
        className={`${cs.select} ${cs.input}`}
      /> */

/* </div> */

// **

/* <FormControl>
        <Select
          value={active.toString()}
          onChange={test}
          IconComponent={() => <AngleDown aria-hidden="true" />}
          displayEmpty
          className={cs.selectTest}
          inputProps={{ MenuProps: { disableScrollLock: true } }}>
          {queries.map((query, i) => (
            <MenuItem key={i} value={i}>
              {query}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */

/* <div
        className={`${s.inputWrapper} ${cs.inputWrapper} ${cs.input}`}
        style={{ position: "relative" }}> */

/* <div style={{ width: "100%" }}> */

/* </div> */

/* </div> */

// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

// **
// phone: z.string(),
// password: z
//   .string()
//   .min(6, "Password should be atleast 6 characters")
//   .max(45, "Password must be less than 45 characters"),
// confirmPassword: z
//   .string()
//   .min(6, "Password should be atleast 6 characters")
//   .max(45, "Password must be less than 45 characters"),
// accepted: z.literal(true, {
//   errorMap: () => ({
//     message: "Please accepte all terms",
//   }),
// }),
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords doesn't match",
//   path: ["password", "confirmPassword"],
// });

// **

/* <div
   className={`${cs.select} ${cs.input}`}
   role="listbox"
   tabIndex={0}
   onKeyDown={(e) => onSelectKeyDown(e, 0)}
   onClick={(e) => onSelectClick(e, 0)}>
   <div className={`${cs.selectHead} ${active === 0 ? "" : cs.selectHeadActive}`}>
     <span className={cs.selectSelected}>{queries[active]}</span>
     <input type="hidden" name="query" value={active === 0 ? "" : queries[active]} />
     <AngleDown aria-hidden="true" className={cs.inputSvg} />
   </div>
   <div
     className={`${cs.selectWrapper} ${cs.input} ${isOpen ? cs.selectWrapperActive : ""}`}>
     <OverlayScrollbarsComponent defer element="ul" className={cs.selectList}>
       {queries.map((query, i) => (
         <li
           key={i}
           tabIndex={0}
           className={`${cs.selectItem} ${active === i ? cs.selectItemActive : ""}`}
           role="option"
           aria-selected={active === i ? "true" : "false"}
           onKeyDown={(e) => onSelectOptionKeyDown(e, 0, i)}
           onClick={(e) => onSelectOptionClick(e, 0, i)}>
           {query}
         </li>
       ))}
     </OverlayScrollbarsComponent>
   </div>
 </div> */

// **
/* <div
        className={`${s.inputWrapper} ${cs.inputWrapper}`}
        data-form-error={errors?.query?.message}> */

/* </div> */

/* <div
  className={`${s.inputWrapper} ${cs.inputWrapper}`}
  data-form-error={errors?.email?.message}>
  <input {...register("email")} type="text" placeholder="Your Email" className={cs.input} />
</div> */

/* <div
className={`${s.inputWrapper} ${cs.inputWrapper}`}
data-form-error={errors?.fullname?.message}>
<input {...register("fullname")} type="text" placeholder="Full Name" className={cs.input} />
</div> */

/* 
<div
  className={`${s.inputWrapper} ${cs.inputWrapper}`}
  data-form-error={errors?.message?.message}>
  <textarea
    {...register("message")}
    spellCheck={false}
    className={`${s.textarea} ${cs.input}`}
    placeholder="Message"></textarea>
</div> */

/* <div className={cs.btnWrapper} {...requestStatus}>
  <button className={`${s.submit} ${cs.btn} ${cs.btnLg}`} type="submit">
    Send Message
  </button>
</div>; */
