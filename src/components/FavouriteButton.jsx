import { AppContext, useAppContext } from "../context/AppContext";

const FavouriteButton = ({ recipe }) => {
  const { ToggleFavouriteBtn, favourites } = useAppContext();

  if (!recipe) return null;

  const isInFavourites = favourites.some((fav) => fav.idMeal === recipe.idMeal); 

  return (
    <button
      className="favourite-btn"
      onClick={(e) => {
        e.stopPropagation(); // so it doesn't open the modal
        ToggleFavouriteBtn(recipe);
      }}
    >
      {isInFavourites ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
