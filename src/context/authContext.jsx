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

  const [isAdmin, setIsAdmin] = useState(false);

  async function login(userInputs) {
    const response = await axiosInstance.post("/auth/login", userInputs);
    // setUser(response.data);
    console.log(response.data);
  }

  async function verify(user) {
    const response = await axiosInstance.post("/auth/verify", user);
    setUser(response.data.user);
    console.log(response.data);
  }

  async function register(userInputs) {
    const response = await axiosInstance.post("/auth/register", userInputs);
    console.log(response.data);
  }

  async function logout() {
    const response = await axiosInstance.post("/auth/logout");
    setUser(null);
    console.log(response.data);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, login, register, logout, verify }}
    >
      {children}
    </AuthContext.Provider>
  );
};
