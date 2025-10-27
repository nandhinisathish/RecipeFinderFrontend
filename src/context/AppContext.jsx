import { createContext, useContext, useState } from "react";
import randomRecipeAPI from "../utilities/randomRecipeAPI";
import axios from "axios";
import { useAuth } from "../context/authContext/authContext";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Global states
  const [isFavSelected, setIsFavSelected] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [currentFavList, setCurrentFavList] = useState([]);
  const [user, setUser] = useState(null);
  const { cookies } = useAuth();
  const connStr = "http://localhost:3000/api";
  // const [user, setUser] = useState(null);

  // Random recipe + modal states
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  // Logout function
  const logout = () => setUser(null);

  const handleAddfavourite = async (recipe) => {
    console.log(`handle add paramaeter: ${recipe.strMeal} `);
    //if (isInFavourites) {
    const data = {
      idMeal: recipe.idMeal,
      title: recipe.strMeal,
      thumbnail: recipe.strMealThumb || "", // If undefined, set it to empty string
      sourceUrl: recipe.strSource || "", // Similarly handle other optional fields
      youtubeUrl: recipe.strYoutube || "",
      origin: recipe.strArea || "",
      tags: recipe.strTags || [], // tags are optional and an array
      //notes: recipe.notes || "", // notes is a string and optional
      userId: cookies.userId,
    };
    console.log(`handle add: ${recipe.idMeal} `);
    console.log("Token from handle add:", cookies.token);
    console.log("data from handle add:", data);
  
    try {
   
      // If the recipe is already in favourites, remove it
      await axios.post(`${connStr}/favourites`, data, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });
      console.log(`ADDED ${recipe.strMeal} from favourites`);

    } catch (error) {
      console.error("Error adding favourites:", error);
    }
    
  };
  // Toggle favourite function
  const ToggleFavouriteBtn = (recipe) => {
    setFavourites((prev) => {
      // Toggle favourite status
      const isAlreadyFav = prev.some((fav) => fav.idMeal === recipe.idMeal);
      if (isAlreadyFav) {
        return prev.filter((fav) => fav.idMeal !== recipe.idMeal); // Remove from favourites
      } else {
        return [...prev, recipe]; // Add to favourites
      }
    });
  };

  // Handle update of favourites to the backend
  const handleUpdateToggleFavBtn = async () => {
    try {
      if (!cookies.token) {
        toast.error("Please login to update your favourites.");
        return;
      }
      console.log("Favourites being sent to backend:", favourites); // Log the state here

      const response = await axios.put(
        `${connStr}/favourites/update`,
        { favourites },
        {
          headers: {
            "x-auth-token": cookies.token,
          },
        }
      );
      console.log("Updated favourites:", response.data);
      toast.success("Favourites toggle updated!", {
        toastId: "succesUpdateToggle",
      });
    } catch (err) {
      console.error("Error and token is : ", cookies.token);
      console.error("Error updating favourites:", err);
      toast.error("Failed to update favourites.", {
        toastId: "failedUpdateToggle",
      });
    }
  };

  // Updating the favourite list
  const handleUpdateFavourite = async (recipe) => {
    const userId = cookies.userId;
    const token = cookies.token;
    try {
      console.log('fav',favourites); 
      // Check if recipe is already in the list
      const isAlreadyFav = favourites.some(
        (fav) => fav.idMeal === recipe.idMeal
      );

      let updatedFavourites = [];

      if (isAlreadyFav) {
        // If already a favorite, remove it
        updatedFavourites = favourites.filter(
          (fav) => fav.idMeal !== recipe.idMeal
        );
      } else {
        // If not a favorite, add it
        updatedFavourites = [...favourites, recipe];
      }

      // Send updated favourite list to backend
      const response = await axios.put(
        `${connStr}/favourites/update`,
        { favourites: updatedFavourites },
        {
          headers: {
            "x-auth-token": cookies.token,
          },
        }
      );
      // Update the local state with the new list
      setCurrentFavList(updatedFavourites);

      // Show success message
      toast.success(
        isAlreadyFav
          ? "Recipe removed from favourites!"
          : "Recipe added to favourites!"
      );
    } catch (err) {
      console.error("Error updating favourites:", err);
      toast.error("Failed to update favourites.");
    }
  };
  // When sending a DELETE request to remove a favourite
  const handleDeleteFavourite = async (recipe) => {
    // Get the token from cookies (make sure you have cookies.token available)

    const token = cookies.token;

    if (!token) {
      console.error("No token found, cannot proceed with delete.");
      return;
    }

    const headers = {
      "x-auth-token": token,
    };

    try {
      console.log("recipe.idMeal : ", recipe.idMeal);
          console.log("token : ", token);
      const response = await axios.delete(
        `${connStr}/favourites/${recipe.idMeal}`,
        { headers }
      );
      console.log("Favourite removed:", response.data);
      setFavourites((prevFavourites) =>
        prevFavourites.filter((fav) => fav.idMeal !== recipe.idMeal)
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized request. Please log in.");
      } else {
        console.error("Error removing favourite:", error);
      }
    }
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
    console.log("TESTING 1"); //chanhe true ir false
    setSelectedRecipe(recipe);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <AppContext.Provider
      value={{
        handleAddfavourite,
        isFavSelected,
        setIsFavSelected,
        favourites,
        setFavourites,
        ToggleFavouriteBtn,
        handleUpdateToggleFavBtn,
        currentFavList,
        handleUpdateFavourite,
        handleDeleteFavourite,
        user,
        setUser,
        logout,
        selectedRecipe,
        isLoading,
        errMessage,
        fetchRandomRecipe,
        closeModal,
        openModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
