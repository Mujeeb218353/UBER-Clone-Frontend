import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="w-full flex justify-center items-center">
      </div>
      <div className="w-full flex justify-center items-center">
      <span className="loading loading-bars w-16"></span>
      </div>
    </div>
  );
};

export default Loader;