import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Base/Base";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsCheckingAuth(true);
      
      const storedUser = JSON.parse(localStorage.getItem("userData") || "null");
      const storedToken = localStorage.getItem("authToken");
      
      if (storedUser && storedUser._id && storedToken) {
        setUser(storedUser);
        setIsLogged(true);
        setIsCheckingAuth(false);
        return storedUser;
      }

      const response = await axios.get(`${baseurl}User/getuser`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
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
        localStorage.removeItem("authToken");
        return null;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsLogged(false);
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      return null;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem("userData", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("authToken", token);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${baseurl}User/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLogged(false);
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLogged, isCheckingAuth, checkAuthStatus, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);







