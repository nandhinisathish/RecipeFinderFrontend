import { createContext, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export default function AuthProvider({ children = null }) {
  const navigate = useNavigate();
  console.log("AuthProvider rendered. Children:", children);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const connStr = "http://localhost:3000/api";

  async function signUp(formData) {
 try {
      const res = await axios.post(`${connStr}/auth/register`, formData);
      if (res.status === 200 && res.data.token) {
        setCookie("token", res.data.token);
        toast.success(`User with email ${formData.email} registered successfully 🎉`, {toastId: "registration-success"});
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.", {toastId: "registration-failed"});
      }
    } catch (err) {
      console.error(err);
       const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";

      //  If data exists in backend 
      if (backendMsg.toLowerCase().includes("exists")) {
        toast.error("This email already exists. Please sign in instead.", {toastId: "email-already-exists"});
      } else {
        toast.error(backendMsg, {toastId: "backend-msg"});
      }
    }
  }

  async function login(formData) {
    try{

    let result;

    const res = await axios.post(`${connStr}/auth/login`, formData);

    console.log(`resposnse from login: `, res);

    if (res.status === 200 && res.data.token && res.statusText === "OK") {
      setCookie("token", res.data.token);
      setCookie("userEmail", formData.email);
       toast.success("Login successful 🎉", {toastId: "login-success"});
      //result = { msg: res.data.token, isValid: true };

      //return true;

      return { msg: res.data.token, isValid: true };

    } else{
       toast.error("Invalid credentials..", {toastId: "err-Invalid-Crendentials-entered"});
       return { msg: "Invalid credentials",isValid: false}
    }}catch(err) {
      // Always show generic message, even if backend provides more detail
    toast.error("Invalid credentials", {toastId: "err-Invalid-Crendentials"});
    console.error("Login error:", err);
    return { msg: "Invalid credentials", isValid: false };
      return false;
    }
  }

  function logout() {
    removeCookie("token");
    toast.info("You’ve been logged out successfully 👋", {toastId: "logged-out-email"});

    navigate("/");
  }

  const value = useMemo(() => ({ cookies, login, signUp, logout }), [cookies]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
