import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  const clearUserData = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
