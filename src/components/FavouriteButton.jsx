import { AppContext, useAppContext } from "../context/AppContext";

const FavouriteButton = ({ recipe, handleAddfavourite }) => {
  const { ToggleFavouriteBtn, favourites } = useAppContext();


  if (!recipe) return null;

  const isInFavourites = favourites.some((fav) => fav.idMeal === recipe.idMeal);

  return (
    <button
      className="favourite-btn"
      onClick={async(e) => {
        e.stopPropagation(); // so it doesn't open the modal
        ToggleFavouriteBtn(recipe);
        await handleAddfavourite(isInFavourites);
      }}
    >
      {isInFavourites ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
