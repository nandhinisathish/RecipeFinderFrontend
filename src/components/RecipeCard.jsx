import "../css/RecipeCard.css";
import FavouriteButton from "./FavouriteButton";
import RecipeModal from "../components/RecipeModal";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext/authContext";

//import { AppContext, useAppContext } from "../context/AppContext";

const RecipeCard = ({ recipe }) => {
  const { cookies } = useAuth();
  const headers = {
    "x-auth-token": cookies.token,
  };
  const connStr = "http://localhost:3000/api";

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { strMeal, idMeal, strMealThumb } = recipe;

  const handleSelectRecipe = () => {
    setSelectedRecipe(recipe);
  };
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const handleAddfavourite = async (isInFavourites) => {
    if (isInFavourites) {
      const data = {
        idMeal: recipe.idMeal,
        title: recipe.title,
        thumbnail: recipe.thumbnail,
        sourceUrl: recipe.sourceUrl,
        youtubeUrl: recipe.youtubeUrl,
        origin: recipe.origin,
        tags: recipe.tags,
        notes: recipe.tags,
      };
      await axios.post(`${connStr}/favourites`, data, headers);
    }
  };

  return (
    <>
      <li className="recipe-card" onClick={handleSelectRecipe}>
        <img src={strMealThumb} alt={strMeal} />
        <p>{strMeal}</p>

        <FavouriteButton
          recipe={recipe}
          handleAddfavourite={handleAddfavourite}
        />
      </li>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} closeModal={handleCloseModal} />
      )}
    </>
  );
};

export default RecipeCard;
