import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ loggedin: false }}>
      {children}
    </AuthContext.Provider>
  );
};
