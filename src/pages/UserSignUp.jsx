import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const UserSignUpPage = () => {
  const { contextSafe } = useGSAP();
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

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(userCredentials);
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
        className="w-full xs:w-[90%] sm:w-[85%] md:w-[65%] lg:w-[45%] xl:w-[30%] flex justify-center items-center flex-col gap-1 md:rounded-3xl md:shadow-2xl md:py-8 px-4"
        ref={formRef}
        onSubmit={handleSignUp}
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <label className="form-control w-[97%] xs:w-11/12">
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
        <label className="form-control w-[97%] xs:w-11/12">
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
              setUserCredentials({ ...userCredentials, email: e.target.value })
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
        <label className="form-control w-[97%] xs:w-11/12">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <div className="input input-bordered flex justify-between items-center">
            <input
              type={`${showPassword.password ? "text" : "password"}`}
              className=""
              placeholder="password"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
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
        <label className="form-control w-[97%] xs:w-11/12">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <div className="input input-bordered flex justify-between items-center">
            <input
              type={`${showPassword.confirmPassword ? "text" : "password"}`}
              className=""
              placeholder="password"
              value={userCredentials.confirmPassword}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  confirmPassword: e.target.value,
                })
              }
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
        <button
          type="submit"
          className="w-11/12 md:w-9/12 btn btn-neutral rounded-3xl shadow-2xl my-4"
        >
          Sign UP
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
