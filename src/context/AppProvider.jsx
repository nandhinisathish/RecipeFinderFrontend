import AuthProvider from "./authContext/authContext.jsx";
import UserProvider from "./userContext/userContext.jsx";
import { AppProvider as GlobalAppProvider } from "./AppContext.jsx";
import { CookiesProvider } from "react-cookie";

export default function AppProvider({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <GlobalAppProvider>
          <UserProvider>{children}</UserProvider>
        </GlobalAppProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
