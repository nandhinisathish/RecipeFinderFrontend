import RegisterForm from "../components/AuthForms/RegisterForm";
import LoginForm from "../components/AuthForms/LoginForm";
import { useState } from "react";
import { useAuth } from "../context/authContext/authContext";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
   const { cookies } = useAuth();
  const [newUser, setNewUser] = useState(false);
  if (cookies.token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {newUser ? (
        <RegisterForm setNewUser={setNewUser} />
      ) : (
        <LoginForm setNewUser={setNewUser} />
      )}
    </>
  );
}
