import RecipeCard from "./RecipeCard";
import { useAppContext } from "../context/AppContext";

const FavouriteRecipes = ({ handleRecipeClick }) => {
  const { favourites } = useAppContext();

  return (
    <section className="favourites-section">
      <h2 className="favourites-title">Favourites ❤️</h2>

      {favourites.length === 0 ? (
        <p className="no-favourites">No favourite recipes added yet.</p>
      ) : (
        <ul className="all-recipes-list">
          {favourites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              handleRecipeClick={handleRecipeClick}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavouriteRecipes;