import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header.jsx";
import RandomRecipe from "./pages/RandomRecipe.jsx";
import FavouritePage from "./pages/FavouritePage.jsx";
import { useAuth } from "./context/authContext/authContext.jsx";

const App = () => {
  
  const {cookies} = useAuth();

  return (
    <div className="app-wrapper">
      {/* Background image behind everything */}
      <div className="background-image"></div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/random" element={<RandomRecipe />} />
            {cookies.token && <Route path="/favourites" element={<FavouritePage />} />}     
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
         
        </main>
      </div>

  );
};

export default App;
