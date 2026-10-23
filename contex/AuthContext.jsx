import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../src/components/userComponents/config/Api.routes.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/getMe`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch logged-in user");
        }

        const data = await response.json();

        setLoggedInUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
