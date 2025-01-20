"use client";
import { getUserDetails, loadUserDetailsFromID } from "@/actions/auth-actions";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../schemaInterfaces";
import { useToken } from "./TokenContext";

interface UserContextType {
  user?: UserInfo;
  profileUser?: UserInfo;
  isLoading: boolean;
  error?: string;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
  getUserNameById: (
    userId: string
  ) => Promise<{ name: string; avatar: string | null } | null>;
  loadUserByID: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [profileUser, setProfileUser] = useState<UserInfo | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails(token);
        if (userData) {
          setUser(userData);
        } else {
          setError("User data not found");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const loadUserByID = async (userId: string) => {
    try {
      const user = await loadUserDetailsFromID(userId);
      if (user) {
        setProfileUser(user);
      }
    } catch (err) {
      console.error("Error fetching user name by ID", err);
    }
  };

  const getUserNameById = async (userId: string) => {
    try {
      const user = await loadUserDetailsFromID(userId);
      if (user) {
        return {
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar || null,
        };
      }
    } catch (err) {
      console.error("Error fetching user name by ID", err);
    }
    return null;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profileUser,
        setUser,
        isLoading,
        error,
        getUserNameById,
        loadUserByID,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
