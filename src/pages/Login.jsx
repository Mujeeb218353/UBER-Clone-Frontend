import React, { useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data, Link } from "react-router-dom";
import { FormStateContext } from "../context/FormStateContext.jsx";
import Alert from "../components/Alert.jsx";

const Login = () => {
  const { formState, updateFormState, resetFormState } = useContext(FormStateContext);
  const { contextSafe } = useGSAP();
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    updateFormState({ isLoading: true, isSuccess: false, isError: false, errorMessage: "", successMessage: "", data: userCredentials });
    setTimeout(() => {
      setUserCredentials({ email: "", password: "", role: "user" });
      resetFormState();
    }, 2000);
    try{
    console.log(userCredentials);
    updateFormState({ isLoading: false, isSuccess: true, isError: false, successMessage: "Logged In Successfully" });
    }catch(err){
      console.log(err);
      updateFormState({ isLoading: false, isSuccess: false, isError: true, errorMessage: err.message });
    }
  };

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 200,
      opacity: 0,
      duration: 1,
    });
  }, [contextSafe]);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center flex-col overflow-hidden px-2">
      <form
        className="w-full xs:w-[80%] sm:w-[65%] md:w-[55%] lg:w-[35%] xl:w-[20%] flex justify-center items-center flex-col gap-8 md:rounded-3xl md:shadow-2xl py-8 px-4"
        ref={formRef}
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-bold">Login</h1>
        <Alert />
        <label className="input input-bordered flex items-center gap-2 w-[97%] xs:w-11/12">
          Email
          <input
            type="email"
            className="w-full"
            placeholder="example@example.com"
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials({ ...userCredentials, email: e.target.value })
            }
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[97%] xs:w-11/12">
          Password
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="w-full"
            placeholder="password"
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
            minLength={8}
            required
          />
          <i
            className={` ${showPassword ? "ri-eye-off-line" : "ri-eye-line"}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </label>
        <div className="w-[97%] xs:w-11/12 flex justify-evenly items-center gap-8">
          <label className="label cursor-pointer flex gap-4">
            <span className="label-text">User</span>
            <input
              type="radio"
              name="role"
              value={"user"}
              onChange={(e) =>
                setUserCredentials({ ...userCredentials, role: e.target.value })
              }
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
          <label className="label cursor-pointer flex gap-4">
            <span className="label-text">Captain</span>
            <input
              type="radio"
              name="role"
              value={"captain"}
              onChange={(e) =>
                setUserCredentials({ ...userCredentials, role: e.target.value })
              }
              className="radio checked:bg-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-11/12 md:w-9/12 btn btn-neutral rounded-3xl shadow-2xl"
          disabled={formState.isLoading}
        >
          {formState.isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center">
          Don’t have an account yet ?
          <Link to={"/users/signup"} className="link">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
