import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner.jsx";
import { API_BASE_URL, API_ENDPOINTS, API_OPTIONS } from "../config/apiConfig"; 


const RandomRecipe = () => {

  const [onClick, setOnClick] = useState(false);
  
  const {
    fetchRandomRecipe,
    selectedRecipe,

    isLoading,
    errMessage,

  } = useAppContext();

  useEffect(() => {

    fetchRandomRecipe();
  }, []);

  useEffect(() => {

    fetchRandomRecipe();
  }, [onClick]);

  const handleRandomRecipe = () => {
setOnClick((prev)=>!prev)
  }
  return (

    <div className="random-recipe-page">
     
        <div className="random-button-container">
          <button id="random-button" className="random-button" onClick={handleRandomRecipe}>
            Get Random Recipe
          </button>
        </div>
      <h2>Random Recipe</h2>

      {isLoading && <Spinner/>}
      {errMessage && <p className="error">{errMessage}</p>}

      {selectedRecipe && <RecipeCard
              key={selectedRecipe.idMeal}
              recipe={selectedRecipe}
             
            />}
    </div>
  );
};

export default RandomRecipe;