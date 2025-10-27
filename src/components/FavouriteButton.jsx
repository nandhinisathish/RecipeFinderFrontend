import { useState, useEffect } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { useAuth } from "../context/authContext/authContext";

const FavouriteButton = ({ recipe, handleAddfavourite }) => {
  const [favLocal, setFavlocal] = useState([]);
  useEffect(() => {
    if (favLocal.length > 0) {
      // This ensures handleUpdateToggleFavBtn is called after favLocal is updated
      handleUpdateToggleFavBtn(favLocal);
    }
  }, [favLocal]);

  const { cookies } = useAuth();
  const {
    isFavSelected,
    setIsFavSelected,
    ToggleFavouriteBtn,
    favourites,
    setFavourites,
    handleUpdateFavourite,
    handleUpdateToggleFavBtn,
    handleDeleteFavourite,
  } = useAppContext();

  if (!recipe) return null;

  const isInFavourites = favLocal.some((fav) => fav.idMeal === recipe.idMeal);

  const handleClickFavBtn = async (recipe) => {
    console.log("favbtn.jsx , recipe object: ", recipe); // Log the whole recipe object
    console.log("favbtn.jsx , idMeal : ", recipe.idMeal);
    if (!isInFavourites) {
      setFavlocal((prev) => [...prev, recipe]);
      setIsFavSelected((prev) => !prev); // Set isFavSelected to true
    } else {
      // Remove from favourites
      await handleDeleteFavourite(recipe);
      setIsFavSelected((prev) => !prev); // Set isFavSelected to false
    }
  };
  return (
    <button
      className="favourite-btn"
      onClick={async (e) => {
        e.stopPropagation(); // so it doesn't open the modal
        ToggleFavouriteBtn(recipe);
        await handleClickFavBtn(recipe);
        //await handleUpdateFavourite(recipe)
      }}
    >
      {isInFavourites ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteButton;
