import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default AppContext;