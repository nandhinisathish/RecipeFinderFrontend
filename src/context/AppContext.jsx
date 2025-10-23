import { createContext, useContext, useState } from "react";
import randomRecipeAPI  from "../utilities/randomRecipeAPI"; 

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Global states
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);
   // const [user, setUser] = useState(null);

  // Random recipe + modal states
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  // Logout function
  const logout = () => setUser(null);

  // Toggle favourite function
  const ToggleFavouriteBtn = (recipe) => {
    setFavourites((prev) =>
      prev.some((fav) => fav.idMeal === recipe.idMeal)
        ? prev.filter((fav) => fav.idMeal !== recipe.idMeal)
        : [...prev, recipe]
    );
  };

  // Fetch random recipe function
  const fetchRandomRecipe = async () => {

    setIsLoading(true);
    setErrMessage("");

    try {
      const recipe = await randomRecipeAPI();
      setSelectedRecipe(recipe); // Triggers modal

    } catch (err) {
      console.error("❌ Random recipe fetch error:", err.message);
      setErrMessage("Could not load a random recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  

   // Open modal function
  const openModal = (recipe) => {
      console.log("TESTING 1");//chanhe true ir false
   setSelectedRecipe(recipe);
 
  };

  // Close modal function
  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <AppContext.Provider
      value={{
        favourites,
        ToggleFavouriteBtn,
        user,
        setUser,
        logout,
        selectedRecipe,
        isLoading,
        errMessage,
        fetchRandomRecipe,
        closeModal,
        openModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
