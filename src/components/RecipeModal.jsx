import "../css/RecipeModal.css";
import FavouriteButton from "./FavouriteButton";
import { AppContext, useAppContext } from "../context/AppContext.jsx";
const RecipeModal = ({ recipe, closeModal}) => {
  const {
    isSelectedFavouriteBtn,
    setIsSelectedFavouriteBtn,
    onClickFavouriteBtn: ToggleFavouriteBtn,
  } = useAppContext;

  const {
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions,
    strYoutube,
    strSource,
    idMeal
  } = recipe;

  // Extract ingredients & measures
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(
        <li key={i}>
          {measure ? `${measure} ` : ""} {ingredient}
        </li>
      );
    }
  }

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          ×
        </button>
        <h2>{strMeal}</h2>
        <FavouriteButton recipe={recipe} />
        <img src={strMealThumb} alt={strMeal} />
        <p>
          <strong>Category:</strong> {strCategory}
        </p>
        <p>
          <strong>Area:</strong> {strArea}
        </p>
        <h3>Ingredients</h3>
        <ul>{ingredients}</ul>
        <h3>Instructions</h3>
        <p>
          {strInstructions?.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        {strYoutube && (
          <p>
            <a href={strYoutube} target="_blank" rel="noopener noreferrer">
              ▶ Watch on YouTube
            </a>
          </p>
        )}
        {strSource && (
          <p>
            <a href={strSource} target="_blank" rel="noopener noreferrer">
              🔗 Original Source
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
