import { createContext, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";


const AuthContext = createContext();

export default function AuthProvider({ children = null}) {


  
  console.log("AuthProvider rendered. Children:", children);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const connStr = "http://localhost:3000/api";

  async function signUp(formData) {
    const res = await axios.post(`${connStr}/auth/register`, formData);
    setCookie("token", res.data.token);
  }

  async function login(formData) {


    const res = await axios.post(`${connStr}/auth/login`, formData);

    console.log(`resposnse from login: `,  res);

    if(res.status===200 && res.data.token && res.statusText==="OK"){
      setCookie("token", res.data.token);
     return true;

    }else{
      return false;
    }

    
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