import { createContext, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const connStr = "http://localhost:3000/api";

  async function signUp(formData) {
    const res = await axios.post(`${connStr}/user`, formData);
    setCookie("token", res.data.token);
  }

  async function login(formData) {
    const res = await axios.post(`${connStr}/auth`, formData);
    setCookie("token", res.data.token);
  }

  function logout() {
    removeCookie("token");
  }

  const value = useMemo(
    () => ({ cookies, login, signUp, logout }),
    [cookies]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}