import React from "react";
import{ createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Base/Base";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userData") || "null");
      if (storedUser && storedUser._id) {
        setUser(storedUser);
        setIsLogged(true);
        return storedUser;
      }

      const response = await axios.get(`${baseurl}User/getuser`, {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
        setIsLogged(true);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        setUser(null);
        setIsLogged(false);
        localStorage.removeItem("userData");
        return null;
      }
    } catch {
      setUser(null);
      setIsLogged(false);
      localStorage.removeItem("userData");
      return null;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLogged, isCheckingAuth, checkAuthStatus, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
