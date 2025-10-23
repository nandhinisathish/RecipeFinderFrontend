import { useReducer, useState } from "react";
import "../css/Search.css"


// const reducer = (action, state) => {

//     switch(action.type){
//         case recipeBySearchTerm :


//         default :


//     }

// }



const Search = ({searchTerm, setSearchTerm,  onRandomRecipeClick}) => {

    //const [state, dispatch] = useReducer(reducer, initialstate);

    return (<div className="recipe-finder-container">
       
        
        <form id="search-form" className="search-box">
         
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search by name (eg. 'carrot')"
          />
               
        </form>

        {/* <div className="random-button-container">
          <button id="random-button" className="random-button" onClick={onRandomRecipeClick}>
            Get Random Recipe
          </button>
        </div>

        <div className="message" id="message-area">
          Search for a recipe or get a random one!
        </div> */}

        <div className="results-grid" id="results-grid"></div>
      </div>)
}

export default Search;