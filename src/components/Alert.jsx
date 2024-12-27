import React, { useContext} from 'react'
import { FormStateContext } from '../context/FormStateContext';


const Alert = () => {
    const { formState } = useContext(FormStateContext);
  return (
    <div className={`${formState.isError ? "alert alert-danger" : formState.isSuccess ? "alert alert-success" : "" }`}>{formState.errorMessage || formState.successMessage}</div>
  )
}

export default Alert