import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {useAuth} from "../context/authContext/authContext.jsx";
import "../App.css";
import Search from "../components/Search";
import RecipeResultsSection from "../components/RecipeResultsSection";
import RecipeModal from "../components/RecipeModal";
import FavouriteRecipes from "../components/FavouriteRecipes";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner.jsx";
import { API_BASE_URL, API_ENDPOINTS, API_OPTIONS } from "../config/apiConfig";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const { cookies, logout } = useAuth();



  const { fetchRandomRecipe, errMessage: randomRecipeError, closeModal, openModal} = useAppContext();

  // Fetch random recipe when component mounts
  /** useEffect(() => {
    fetchRandomRecipe();
  }, [fetchRandomRecipe]);
  */

  // Fetch recipe by search term
  const SearchRecipes = async (e) => {
 // Initially setting up the state for loading as true.
  setIsLoading(true); 
  // Initially setting up the state for error as "", as nothing has happened. 
  setErrMessage(""); 
  try { 
    const endPoint = `${API_BASE_URL}${API_ENDPOINTS.search}${searchTerm}`; 
    const response = await fetch(endPoint, API_OPTIONS); 
     console.log("TEST -REsponse", response); 
    if (!response.ok) {
       console.log("TEST -REsponse, throw NOT OK : ", response); 
      throw new Error(`Failed to fetch recipes`); 

      } 
    const data = await response.json(); 
    console.log("TEST -REsponse, data : ", data); 
   // console.log(data); 
    if (data.meals === "False"){
          console.log("TEST -REsponse, data.meals  : ", data.meals ); 
      setErrMessage( data.Error || `Failed to fetch the recipe for the ${searchTerm}` ); 
    setRecipeList([]); // In case, data takes longer time to load return; 
    } 
    setRecipeList(data.meals || []); 
  } catch (error) { 
    console.error(`Error fetcing recipes - ${error.message}`); 
    setErrMessage(`Error fetching recip`); 
  } finally { 
    // If success or failed to fetch data, we want to stop loading. 
    // // If success - will display the recipe list from try block or
    // // Failed - will display the error message from catch block
     setIsLoading(false); } };

       useEffect(() => {
    // Setting debounce logic for API call
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        SearchRecipes();
      }
    }, 1000); // wait 1000 ms/1sec

    return () => clearTimeout(timer); // resetting timer, when user types again
  }, [searchTerm]);
  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} SearchRecipes={SearchRecipes} />
      <RecipeResultsSection recipeList={recipeList} isLoading={isLoading} />
      {/* <FavouriteRecipes /> */}
      
      {/* Random Recipe Section */}
      {/* <div className="random-recipe">
        <h2>Random Recipe</h2>
        {isLoading && <Spinner />}
        {randomRecipeError && <p className="error">{randomRecipeError}</p>}
    
      </div> */}
    </div>
  );
};

export default Home;