import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header.jsx";
import RandomRecipe from "./pages/RandomRecipe.jsx";

const App = () => {
  return (
   
      <div style={{backgroundColor:"#faf8f8ff"}}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/random" element={<RandomRecipe />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
          //trernary
        </main>
      </div>

  );
};

export default App;
