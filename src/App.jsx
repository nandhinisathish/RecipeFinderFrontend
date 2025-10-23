import './App.css';
import { useState } from "react";
import Header from "./components/Header.jsx";
import Search from "./components/Search.jsx";


const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
   
      <div style={{backgroundColor:"#faf8f8ff"}}>
        <Header />
        <Search/>
       
       
      </div>

  );
};

export default App;

