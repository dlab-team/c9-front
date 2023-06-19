import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchContext = createContext();

function SearchContextProvider(props) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      setSearchTerm(event.target.value);
      navigate(`/busqueda/${event.target.value}`);
    }
  };

  return (
    <SearchContext.Provider value={{ handleSearch, searchTerm }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
