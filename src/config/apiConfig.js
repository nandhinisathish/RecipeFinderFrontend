
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://www.themealdb.com/api/json/v1/1";

export const API_ENDPOINTS = {
  search: "/search.php?s=",
  random: "/random.php",
  lookup: "/lookup.php?i=",
};

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};