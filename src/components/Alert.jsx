import React, { useContext } from "react";
import { FormStateContext } from "../context/FormStateContext";

const Alert = () => {
  const { formState } = useContext(FormStateContext);
  return (
    <div
      role="alert"
      className={`${
        formState.isError
          ? "alert alert-error"
          : formState.isSuccess
          ? "alert alert-success"
          : ""
      } ${formState.isError || formState.isSuccess ? "w-full h-full" : "w-0 h-0"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={`${
            formState.isError
              ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              : formState.isSuccess ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : ""
          } `}
        />
      </svg>
      <span>{formState.errorMessage || formState.successMessage}</span>
    </div>
  );
};

export default Alert;
