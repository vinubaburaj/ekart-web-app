import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "./Ekart/Auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await checkAuth();

        if (response.authenticated) {
          setUser(response.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const invalidateAuth = () => {
    setUser(null);
  };

  const setInitialAuth = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, invalidateAuth, setInitialAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
