import { createContext, useContext, useEffect, useState } from "react";
import { QUERY_USER_CURRENT } from "../../queries/UserGraphql";
import { useLazyQuery } from "@apollo/client";
const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUser, { loading, error, data }] = useLazyQuery(QUERY_USER_CURRENT);
  useEffect(() => {
    const checkAuth = async () => {
      if (auth) return;
      try {
        const res = await currentUser();
        if (res.data?.currentUser) {
          setUser(res.data.currentUser);
          setAuth(true);
        } else {
          setUser(null);
          setAuth(false);
        }
      } catch (error) {
        setUser(null);
        setAuth(false);
      }
    };

    checkAuth();
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth, user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
