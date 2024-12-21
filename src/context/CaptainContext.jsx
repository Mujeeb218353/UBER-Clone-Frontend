import { createContext, useState, useContext } from "react";

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captainData, setCaptainData] = useState([]);

  return (
    <CaptainContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider;