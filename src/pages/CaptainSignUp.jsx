import React, { useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { FormStateContext } from "../context/FormStateContext.jsx";
import Alert from "../components/Alert.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { CaptainContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignUpPage = () => {
  const { contextSafe } = useGSAP();
  const navigate = useNavigate();
  const { formState, updateFormState, resetFormState } =
    useContext(FormStateContext);
  const { updateCaptainData } = useContext(CaptainContext);
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
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "car",
    },
    password: "",
    confirmPassword: "",
    role: "captain",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const {
      fullName,
      profile,
      phoneNumber,
      email,
      password,
      vehicle,
      confirmPassword,
      role,
    } = userCredentials;

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
      !profile ||
      !vehicle?.color ||
      !vehicle?.plate ||
      !vehicle?.capacity ||
      !vehicle?.vehicleType
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
    formData.append("vehicle[color]", userCredentials.vehicle.color);
    formData.append("vehicle[plate]", userCredentials.vehicle.plate);
    formData.append("vehicle[capacity]", userCredentials.vehicle.capacity);
    formData.append(
      "vehicle[vehicleType]",
      userCredentials.vehicle.vehicleType
    );

    try {
      updateFormState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
      });

      const { data } = await axios.post(
        "http://localhost:8080/api/captains/register",
        formData
      );

      updateCaptainData(data.data);

      login(data.data, role);

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
          vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: "",
          },
          role: "captain",
        });

        navigate("/captains");
      }, 1000);
    } catch (error) {
      console.log(error);
      updateFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage:
          error.response.data.message ||
          "Something went wrong. Please try again.",
      });
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
    <div className="w-full h-full min-h-screen flex justify-center items-center flex-col overflow-hidden px-2 md:py-10">
      <form
        className="w-full lg:w-10/12 xl:w-9/12 flex justify-center items-center flex-col gap-4 p-4"
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
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
          <label className="form-control w-[97%] xs:w-11/12">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full"
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
          <label className="form-control w-[97%] xs:w-11/12">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="tel"
              className="input input-bordered w-full"
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
              <span className="label-text">Vehicle Color</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Blue"
              value={userCredentials.vehicle.color}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  vehicle: {
                    ...userCredentials.vehicle,
                    color: e.target.value,
                  },
                })
              }
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Vehicle Plate</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. ABC-123"
              value={userCredentials.vehicle.plate}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  vehicle: {
                    ...userCredentials.vehicle,
                    plate: e.target.value,
                  },
                })
              }
              required
            />
          </label>
        </div>
        <div className="w-[97%] xs:w-11/12 flex flex-col md:flex-row gap-4">
          <label className="form-control w-[97%] xs:w-11/12">
            <div className="label">
              <span className="label-text">Vehicle Capacity</span>
            </div>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="e.g. 4"
              value={userCredentials.vehicle.capacity}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  vehicle: {
                    ...userCredentials.vehicle,
                    capacity: e.target.value,
                  },
                })
              }
              required
            />
          </label>
          <label className="form-control w-[97%] xs:w-11/12">
            <div className="label">
              <span className="label-text">Vehicle Type</span>
            </div>
            <select
              className="select select-bordered w-full"
              defaultValue="car"
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  vehicle: {
                    ...userCredentials.vehicle,
                    vehicleType: e.target.value,
                  },
                })
              }
              required
            >
              <option className="w-full" value={"car"}>
                Car
              </option>
              <option className="w-full" value={"rikshaw"}>
                Rikshaw
              </option>
              <option className="w-full" value={"motorcycle"}>
                Motor Cycle
              </option>
            </select>
          </label>
        </div>
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
                  showPassword.confirmPassword
                    ? "ri-eye-off-line"
                    : "ri-eye-line"
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
          className="w-11/12 md:w-9/12 btn btn-neutral rounded-3xl shadow-2xl my-4"
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
          <Link to={"/users/signup"} className="link">
            Sign Up
          </Link>{" "}
          as a User
        </p>
      </form>
    </div>
  );
};

export default CaptainSignUpPage;
