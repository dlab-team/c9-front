import { createContext, useState } from "react";

export const FiltersContext = createContext();

function FiltersContextProvider(props) {
  const [filters, setFilters] = useState({region:'todas', city: 'todas', category: 'todas'});

  const updateFilters = (partialFilters) => {
      setFilters((prevFiltersState) => ({
        ...prevFiltersState,
        ...partialFilters
      }));
  }

  const filterPublications = (publications) => {
    return publications.filter((publication) =>
      (filters.region === 'todas' ||  publication.location?.regionId === filters.region )  
      &&
      (filters.city === 'todas' || publication.location?.cityId === filters.city)
      &&
     (filters.category === 'todas' || publication.category?.id === filters.category)
    );
  }

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, filterPublications }}>
      {props.children}
    </FiltersContext.Provider>
  );
}

export default FiltersContextProvider;
