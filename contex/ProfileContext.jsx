import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../src/components/userComponents/config/Api.routes.js";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/profile/getProfile`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to get Logged in user profile");
        }

        const data = await response.json();

        setProfile(data.userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(useProfile);

  if (context === null) {
    throw new Error("useProfile must be used inside AuthProvider");
  }

  return context;
};
