import React from "react";
import ThemeProvider from "./ThemeContext.jsx";
import AuthProvider from "./AuthContext.jsx";
import CaptainProvider from "./CaptainContext.jsx";
import UserProvider from "./UserContext.jsx";
import FormStateProvider from "./FormStateContext.jsx";

const GlobalProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CaptainProvider>
          <UserProvider>
            <FormStateProvider>{children}</FormStateProvider>
          </UserProvider>
        </CaptainProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;