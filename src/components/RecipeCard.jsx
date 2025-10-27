import "../css/RecipeCard.css";
import FavouriteButton from "./FavouriteButton";
import RecipeModal from "../components/RecipeModal";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext/authContext";
import { AppContext, useAppContext } from "../context/AppContext";

//import { AppContext, useAppContext } from "../context/AppContext";

const RecipeCard = ({ recipe }) => {

  const {
    handleAddfavourite
  } = useAppContext();

  const { cookies } = useAuth();
  const headers = {
    "x-auth-token": cookies.token,
  };
  const connStr = "http://localhost:3000/api";

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //const { strMeal, idMeal, strMealThumb } = recipe;

  const handleSelectRecipe = () => {
    setSelectedRecipe(recipe);
  };
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };



  return (
    <>
      <li className="recipe-card" onClick={handleSelectRecipe}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p>{recipe.strMeal}</p>

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
