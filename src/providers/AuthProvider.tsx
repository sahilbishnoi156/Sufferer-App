import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

type ProfileData = {
  // Define profile type
};

type AuthData = {
  isLoggedIn: boolean;
  loading: boolean;
  profile: any;
  error: Error | null;
  pendingUser: any,
  setPendingUser: (value: any) => void,
};

const AuthContext = createContext<AuthData>({
  isLoggedIn: false,
  loading: true,
  profile: null,
  error: null,
  pendingUser: {},
  setPendingUser: (value: any) => {},
});

const PORT = "http://192.168.3.72:3000";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [pendingUser, setPendingUser] = React.useState({});

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["authentication"],
    queryFn: async () => {
      const response = await fetch(`${PORT}/api/mobileApp/user/getUser`);
      const data = await response.json();
      if (data?.error) {
        throw new Error(data?.error);
      }
      return data;
    },
  });

  useEffect(() => {
    if (data && data.isLoggedIn) {
      setIsLoggedIn(true);
      setProfile(data.user);
      router.push('/')
    }else{
      setIsLoggedIn(false)
      setProfile(null);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, profile, error,pendingUser, setPendingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
