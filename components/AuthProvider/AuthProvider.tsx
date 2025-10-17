"use client";

import Loader from "@/app/loading";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getMe();

        if (user) {
          setUser(user);
          setIsLoading(false);
        }
      } else {
        clearIsAuthenticated();
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return isLoading ? <Loader /> : children;
};

export default AuthProvider;
