import Spinner from "./Spinner";
import "../css/RecipeResultsSection.css";
import RecipeCard from "./RecipeCard";
import { useContext, useState } from "react";
import { useAppContext } from "../context/AppContext";
import RecipeModal from "../components/RecipeModal";


const RecipeResultsSection = ({ recipeList, isLoading }) => {

    const {  errMessage} = useAppContext();


  return (
    <section className="all-recipes">
      <h2 className="all-recipes-title">All Recipes</h2>

      {isLoading ? (
        <Spinner />
      ) : errMessage ? (
        <p>{errMessage}</p>
      ) : (
        <ul className="all-recipes-list">
          {recipeList.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
          
            />
            
          ))}
        </ul>
      )}
  
      {errMessage && <p className="text-red-500">{errMessage}</p>}
    </section>
  );
};

export default RecipeResultsSection;
