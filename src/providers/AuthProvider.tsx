import React, { PropsWithChildren, createContext, useContext } from "react";

type AuthData = {
  isLoggedIn: boolean;
  profile: {} | null;
  loading: boolean;
  error: Error | null;
};
const AuthContext = createContext<AuthData>({
  isLoggedIn: false,
  loading: true,
  profile: null,
  error: null,
});
const PORT = 'http://192.168.3.72:3000';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [error, setError] = React.useState<Error | null>(null)
  const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${PORT}/api/auth/checkStatus`
        );
        const data = await response.json();
        if (data?.success) {
          // fetch profile
          setIsLoggedIn(true);
          const response = await fetch(
            `${PORT}/api/user/getUser`
          );
          const data = await response.json();
          if (data) setProfile(data);
        }
      } catch (error: any) {
        setError(error)
        console.log(error);
      }
      setLoading(false);
    };
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, profile, error }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
