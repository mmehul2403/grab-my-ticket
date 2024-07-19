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
    const isAuth = async () => {
      try {
        const res = currentUser();

        setUser(res.currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    isAuth();
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth, user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
