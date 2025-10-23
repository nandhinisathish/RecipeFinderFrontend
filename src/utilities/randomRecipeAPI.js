import { API_BASE_URL, API_ENDPOINTS, API_OPTIONS } from "../config/apiConfig";


const randomRecipeAPI = async() => {

  const endpoint = `${API_BASE_URL}${API_ENDPOINTS.random}`;
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error("Failed to fetch random recipe");
  }

  const data = await response.json();

  if (data.meals?.length) {
    return data.meals? data.meals[0]: null;
  } else {
    throw new Error("No meals found");
  }

}

export default randomRecipeAPI;