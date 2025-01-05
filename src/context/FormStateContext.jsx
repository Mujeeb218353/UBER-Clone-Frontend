import React, { createContext, useState } from "react";

export const FormStateContext = createContext();

const FormStateProvider = ({ children }) => {

  const [formState, setFormState] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  });

  const updateFormState = (newState) => {
    setFormState((prev) => ({ ...prev, ...newState }));
  };

  const resetFormState = () => {
    setFormState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
      successMessage: "",
    });
  };

  return (
    <FormStateContext.Provider
      value={{ formState, updateFormState, resetFormState }}
    >
      {children}
    </FormStateContext.Provider>
  );
};

export default FormStateProvider;
