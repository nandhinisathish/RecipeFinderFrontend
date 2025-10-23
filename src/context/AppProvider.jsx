import AuthProvider from "./authContext/authContext.jsx";
import UserProvider from "./userContext/userContext.jsx";
import { CookiesProvider } from "react-cookie";

export default function AppProvider({ children }) {
  return (
    <CookiesProvider>
      <UserProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

