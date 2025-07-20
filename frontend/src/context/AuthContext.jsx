import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { backendDomain } from "../App";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyUser = async () => {
    const token = localStorage.getItem("causeconnect_user");
    if (token) {
      await axios
        .post(`${backendDomain}/auth`, { token: token })
        .then((res) => {
          if (res.data.status) {
            const storedUser = res.data.user;
            setUser(storedUser);
          } else {
            localStorage.removeItem("causeconnect_user");
          }
        })
        .catch((err) => {
          if (err.message != "Network Error") {
            console.error("Auth check failed:", err);
            localStorage.removeItem("causeconnect_user");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const login = async (userData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${backendDomain}/login`, userData)
        .then((res) => {
          if (res.data.success) {
            setTimeout(() => {
              setUser(res.data.user);
              localStorage.setItem("causeconnect_user", res.data.token);
              setIsLoading(false);
              resolve(userData);
            }, 1000);
          } else {
            toast.error(res.data.message);
            setIsLoading(false);
            resolve(userData);
          }
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            toast.info("Server is currently down. Try again later");
          }
          resolve(userData);
        });
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve, reject) => {
      const newUser = {
        ...userData,
        joinDate: new Date().toISOString().split("T")[0],
      };

      axios
        .post(`${backendDomain}/signup`, newUser)
        .then((res) => {
          if (res.data.success) {
            setTimeout(() => {
              setUser(res.data.user);
              localStorage.setItem("causeconnect_user", res.data.token);
              setIsLoading(false);
              resolve(newUser);
            }, 1000);
          } else {
            if (res.data.message == "User already exists") {
              toast.error(
                res.data.message + ", Please try again with different email!"
              );
            } else {
              toast.error(res.data.message);
            }
            setIsLoading(false);
            resolve(newUser);
          }
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            toast.info("Server is currently down. Try again later");
          }
          resolve(userData);
        });
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("causeconnect_user");
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("causeconnect_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isLoading,
    isAuthenticated: !!user,
    verifyUser
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
