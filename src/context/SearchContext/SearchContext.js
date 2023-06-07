import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchContext = createContext();

function SearchContextProvider(props) {
  const navigate = useNavigate();
  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      navigate(`/busqueda/${event.target.value}`);
    }
  };

  return (
    <SearchContext.Provider value={{ handleSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
