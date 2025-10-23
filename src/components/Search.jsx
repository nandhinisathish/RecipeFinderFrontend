import { useReducer, useState } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="recipe-finder-container">
      <form id="search-form" className="search-box">
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name (eg. 'carrot')"
        />
      </form>
    </div>
  );
};

export default Search;
