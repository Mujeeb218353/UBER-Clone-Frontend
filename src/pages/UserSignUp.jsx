import React, { useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { FormStateContext } from "../context/FormStateContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import Alert from "../components/Alert.jsx";
import axios from "axios";

const UserSignUpPage = () => {
  const { contextSafe } = useGSAP();
  const navigate = useNavigate();
  const { formState, updateFormState, resetFormState } =
    useContext(FormStateContext);
  const { updateUserData } = useContext(UserContext);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const formRef = useRef();
  const [userCredentials, setUserCredentials] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    profile: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { fullName, profile, phoneNumber, email, password, confirmPassword } =
      userCredentials;

    if (password !== confirmPassword) {
      updateFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: "Passwords do not match",
      });
      return;
    }

    if (
      !fullName?.firstName ||
      !fullName?.lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !profile
    ) {
      updateFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: "All fields are required, including the profile picture.",
      });

      return;
    }

    const formData = new FormData();
    formData.append("fullName[firstName]", userCredentials.fullName.firstName);
    formData.append("fullName[lastName]", userCredentials.fullName.lastName);
    formData.append("profile", userCredentials.profile);
    formData.append("phoneNumber", userCredentials.phoneNumber);
    formData.append("email", userCredentials.email);
    formData.append("password", userCredentials.password);

    try {
      updateFormState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
      });

      const { data } = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );

      updateUserData(data.data);

      login(data.data, userCredentials.role);

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      updateFormState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        successMessage: "Signed Up Successfully!",
      });

      setTimeout(() => {
        resetFormState();

        setUserCredentials({
          fullName: {
            firstName: "",
            lastName: "",
          },
          profile: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });

        navigate("/users");
      }, 1000);
    } catch (error) {
      console.error("Sign-up Error:", error);
      updateFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      setTimeout(resetFormState, 3000);
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
        className="w-full lg:w-10/12 xl:w-9/12 flex justify-center items-center flex-col gap-4 py-8 px-4"
        ref={formRef}
        onSubmit={handleSignUp}
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <Alert />
        <div className="w-[97%] xs:w-11/12 flex flex-col md:flex-row gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="John"
              value={userCredentials.fullName.firstName}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  fullName: {
                    ...userCredentials.fullName,
                    firstName: e.target.value,
                  },
                })
              }
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Doe"
              value={userCredentials.fullName.lastName}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  fullName: {
                    ...userCredentials.fullName,
                    lastName: e.target.value,
                  },
                })
              }
              required
            />
          </label>
        </div>
        <div className="w-[97%] xs:w-11/12 flex flex-col md:flex-row gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              className="input input-bordered"
              placeholder="example@example.com"
              value={userCredentials.email}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                })
              }
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="tel"
              className="input input-bordered"
              placeholder="921234567890"
              value={userCredentials.phoneNumber}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
          </label>
        </div>
        <label className="form-control w-[97%] xs:w-11/12">
          <div className="label">
            <span className="label-text">Profile</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                profile: e.target.files[0],
              })
            }
            accept="image/*"
            required
          />
        </label>
        <div className="w-[97%] xs:w-11/12 flex flex-col md:flex-row gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <div className="input input-bordered flex justify-between items-center">
            <input
              type={`${showPassword.password ? "text" : "password"}`}
              className=""
              placeholder="Password"
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
              className={`${
                showPassword.password ? "ri-eye-off-line" : "ri-eye-line"
              }`}
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
            ></i>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <div className="input input-bordered flex justify-between items-center">
            <input
              type={`${showPassword.confirmPassword ? "text" : "password"}`}
              className=""
              placeholder="Confirm Password"
              value={userCredentials.confirmPassword}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  confirmPassword: e.target.value,
                })
              }
              minLength={8}
              required
            />
            <i
              className={`${
                showPassword.confirmPassword ? "ri-eye-off-line" : "ri-eye-line"
              }`}
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                })
              }
            ></i>
          </div>
        </label>
        </div>
        <button
          type="submit"
          className="w-[95%] xs:w-1/2 md:w-1/3 lg:w-4/12 xl:w-3/12 btn btn-neutral rounded-3xl shadow-2xl my-4"
          disabled={formState.isLoading}
        >
          {formState.isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign UP"
          )}
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
        <p className="text-center">
          <Link to={"/captains/signup"} className="link">
            Sign Up
          </Link>{" "}
          as a Captain
        </p>
      </form>
    </div>
  );
};

export default UserSignUpPage;
