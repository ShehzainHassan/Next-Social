"use client";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext<
  | {
      token: string | null;
      getToken: () => Promise<string | null>;
      setToken: (token: string) => void;
      clearToken: () => void;
    }
  | undefined
>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTokenCookie = () => {
    if (typeof window !== "undefined") {
      return Cookies.get("token");
    }
    return null;
  };

  const getToken = async () => {
    const storedToken = await getTokenCookie();
    setTokenState(storedToken || null);
    return storedToken || null;
  };

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
      setIsLoading(false);
    };

    fetchToken();
  }, []);

  const setToken = (token: string) => {
    Cookies.set("token", token, {
      expires: 1 / 24,
      path: "/",
      secure: true,
      sameSite: "Lax",
    });
    setTokenState(token);
  };

  const clearToken = () => {
    Cookies.remove("token");
    setTokenState(null);
  };

  if (isLoading) return null;

  return (
    <TokenContext.Provider value={{ token, getToken, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
