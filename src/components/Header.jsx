import "../css/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import { useAppContext } from "../context/AppContext";

const Header = ({ onRandomRecipeClick }) => {
  const { favourites } = useAppContext();
  const { cookies, logout } = useAuth();
  const isLoggedIn = Boolean(cookies.token);
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
        {cookies.token && (
          <Link to="/favourites">
            <button>Favourites</button>
          </Link>
        )}
        {!cookies.token && (
          <Link to="/auth">
            <button>Login/ Sign Up</button>
          </Link>
        )}
        {cookies.token && (
          <Link>
            <button onClick={logout}>Log Out</button>
          </Link>
        )}
      </nav>
      {/* Favourites only for signed-in users */}

      {/* {cookies.token && (
        <div className="favourites-nav">
          <h4>Favourites</h4>
          <ul>
            {favourites.map((recipe) => (
              <li key={recipe.idMeal}>{recipe.strMeal}</li>
            ))}
          </ul>
        </div>
      )} */}
    </header>
  );
};

export default Header;
