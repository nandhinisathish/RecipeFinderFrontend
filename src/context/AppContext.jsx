import { createContext, useContext, useState } from "react";
import randomRecipeAPI  from "../utilities/randomRecipeAPI"; 

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  return (
    <>
      
    </>
  );
};
