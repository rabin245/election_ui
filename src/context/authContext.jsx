import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  async function login(userInputs) {
    const response = await axiosInstance.post("/auth/login", userInputs);
    setUser(response.data);
    console.log(response.data);
  }

  async function test() {
    const response = await axiosInstance.get("/");
    console.log(response.data);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  console.log("user", user);
  return (
    <AuthContext.Provider value={{ user, login, test }}>
      {children}
    </AuthContext.Provider>
  );
};
