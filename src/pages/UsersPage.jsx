import React, { useContext, useState, useRef } from "react";
import UberLogo from "../assets/Uber_logo_2018.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";

const Users = () => {
  const { contextSafe } = useGSAP();
  const { role } = useContext(AuthContext);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef();
  const locationSearchRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", pickup, destination);
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        duration: 1,
        top: "10%",
      });
    }else{
      gsap.to(panelRef.current, {
        duration: 1,
        top: "calc(100% - 18rem)",
      });
    }
  }, [contextSafe, panelOpen]);

  return (
    <div className="h-screen w-full xl:w-9/12 flex items-center flex-col gap-8 relative overflow-hidden">
      <div className="w-11/12 flex items-center justify-between p-5 absolute top-2  rounded-full shadow-lg mx-8">
        <img className="w-16" src={UberLogo} alt="Uber Logo" />
        <Link to={`/users/profile`} className="flex items-center">
          <i className="ri-user-fill text-2xl text-black"></i>
          <p className=" text-black">Profile</p>
        </Link>
      </div>
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
        />
      </div>
      <div
        className="bg-base-100 absolute w-11/12 h-screen flex flex-col gap-4 rounded-t-2xl"
        ref={panelRef}
      >
        <div className="p-5 rounded-tl-2xl rounded-tr-2xl">
          <h4 className="text-3xl font-semibold my-3 flex justify-between items-center">
            Find a Trip
            <i
              className={`ri-arrow-down-s-line text-2xl btn btn-circle border-0  flex justify-center items-center ${
                panelOpen ? "inline" : "hidden"
              }`}
              onClick={() => setPanelOpen(false)}
            ></i>
          </h4>
          <form
            className="flex flex-col justify-center items-center gap-4 relative"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="w-full input input-bordered flex items-center gap-2 py-7">
              <i className="ri-circle-line font-bold"></i>
              <input
                type="text"
                className="w-11/12"
                placeholder="Add a pick-up location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onClick={() => setPanelOpen(true)}
                required
              />
            </label>
            <div className={`w-[3px] h-12 absolute top-10 left-[1.45rem] rounded-full bg-base-content`}></div>
            <label className="w-full input input-bordered flex items-center gap-2 py-7">
              <i className="ri-square-line font-bold"></i>
              <input
                type="text"
                className="w-11/12"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onClick={() => setPanelOpen(true)}
                required
              />
            </label>
            <button
              type="submit"
              className="btn font-semibold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
        <div className={`h-full p-5 ${panelOpen ? "block" : "hidden"}`} ref={locationSearchRef}>
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Users;
