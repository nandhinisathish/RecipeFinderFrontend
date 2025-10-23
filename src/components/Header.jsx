import "../css/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";

const Header = ({ onRandomRecipeClick }) => {
  return (
    <header className="app-header">
      <h1 className="logo">🍽️ Recipe Finder</h1>
      <nav className="nav-tabs">
        <Link to="/">
          {" "}
          <button>Home</button>
        </Link>
        <Link to="/about">
          {" "}
          <button>About</button>
        </Link>
        <Link to="/random">
           {" "}
             <button>Random Recipe</button>
         
        </Link>

        <Link to="/auth">
          <button>Login/ Sign Up</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
