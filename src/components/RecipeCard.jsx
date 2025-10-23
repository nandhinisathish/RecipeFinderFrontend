import "../css/RecipeCard.css";
import FavouriteButton from "./FavouriteButton";
import RecipeModal from "../components/RecipeModal";
import { useState } from "react";

//import { AppContext, useAppContext } from "../context/AppContext";

const RecipeCard = ({ recipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { strMeal, idMeal, strMealThumb } = recipe;


  const handleSelectRecipe = () =>{
  setSelectedRecipe(recipe);
          
  }
  const handleCloseModal = () =>{
  setSelectedRecipe(null);
          
  }
  return (
    <>
      <li
        className="recipe-card"
        onClick={handleSelectRecipe}
      >
        <img src={strMealThumb} alt={strMeal} />
        <p>{strMeal}</p>

        <FavouriteButton recipe={recipe} />
      </li>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe}  closeModal={handleCloseModal} />
      )}
    </>
  );
};

export default RecipeCard;
