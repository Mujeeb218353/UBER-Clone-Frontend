import { createContext, useState, useEffect } from "react";

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);

  useEffect(() => {
      const storedCaptainData = localStorage.getItem("userData");
      if (storedCaptainData) {
        setCaptainData(JSON.parse(storedCaptainData));
      }
    }, []);
  
    const updateCaptainData = (newCaptainData) => {
      setCaptainData(newCaptainData);
      localStorage.setItem("userData", JSON.stringify(newCaptainData));
    };
  
    const clearCaptainData = () => {
      setCaptainData(null);
      localStorage.removeItem("userData");
    };

  return (
    <CaptainContext.Provider value={{ captainData, updateCaptainData, clearCaptainData }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider;