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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", pickup, destination);
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        duration: 1,
        height: "70%",
      });
    } else {
      gsap.to(panelRef.current, {
        duration: 1,
        height: "0%",
      });
    }
  }, [contextSafe, panelOpen]);

  return (
    <div className="min-h-screen w-full xl:w-9/12 flex items-center flex-col gap-8 relative">
      <div className="w-full flex items-center justify-between px-4 pt-8">
        <img className="w-16" src={UberLogo} alt="Uber Logo" />
        <Link to={`/users/profile`} className="flex items-center">
          <i className="ri-user-fill text-2xl"></i>
          <p className="">Profile</p>
        </Link>
      </div>
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 w-full h-screen flex flex-col justify-end rounded-tl-2xl rounded-tr-2xl">
        <div className="p-5 bg-white rounded-tl-2xl rounded-tr-2xl">
          <h4 className="text-3xl font-semibold text-black my-3 flex justify-between items-center">
            Find a Trip
            <i
              className={`ri-arrow-down-s-line text-2xl btn btn-circle bg-[#d6d6d6] hover:bg-[#eee] border-0 text-black flex justify-center items-center ${
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
            <label className="w-full input input-bordered input-warning flex items-center gap-2 py-7 bg-[#eee] border-0">
              <i className="ri-circle-line font-bold text-black"></i>
              <input
                type="text"
                className="w-11/12 text-black"
                placeholder="Add a pick-up location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onClick={() => setPanelOpen(true)}
                required
              />
            </label>
            <div className="bg-black w-[3px] h-12 absolute top-10 left-[1.45rem] rounded-full"></div>
            <label className="w-full input input-bordered input-warning flex items-center gap-2 py-7 bg-[#eee] border-0 ">
              <i className="ri-square-line font-bold text-black"></i>
              <input
                type="text"
                className="w-11/12 text-black"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onClick={() => setPanelOpen(true)}
                required
              />
            </label>
            <button
              type="submit"
              className="btn bg-[#eee] hover:bg-[#d6d6d6] border-0 font-semibold text-black rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
        <div
          className={` ${panelOpen ? "p-5" : "p-0"}`}
          ref={panelRef}
        >
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Users;
