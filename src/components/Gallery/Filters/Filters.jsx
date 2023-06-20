import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Select, initTE } from "tw-elements";
import { FiltersContext } from "../../../context/FiltersContext";

// TODO: traer esta data desde el back

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Filters = ({filterOnClick}) => {
  const [categorias, setCategorias] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [currentComunas, setCurrentComunas] = useState([]);
  const {filters, updateFilters} = useContext(FiltersContext);

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`
    );
    const data = await response.json();
    const dataCapitalized = data.map((item) => {
      item.name = capitalize(item.name);
      return item;
    });
    setCategorias(dataCapitalized);
  };
  const getRegiones = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/regions`
    );
    const data = await response.json();
    setRegiones(data);
  };

  useEffect(() => {
    getCategories();
    getRegiones();
    initTE({ Select });
  }, []);

  useEffect(() => {
    loadComunas();
  }, [filters]);

  const loadComunas = () => {
    const index = regiones.findIndex((region) => region.id === filters.region);
    const comunas = regiones[index]?.cities || [];
    setCurrentComunas(comunas);
  };

  return (
      <div className="mb-[2em] p-0 sm:gap-4 container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
        <div className='flex mt-2 gap-2'>
        <button type="button" className="sm:hidden flex items-center mr-2"
          onClick={() => filterOnClick()}
        >
          <FontAwesomeIcon icon={faFilter} className="text-secondary h-6" />
        </button>
        <div
          className="relative inline-block"
        >
          <div className="relative inline-block rounded-lg">
            <select
              data-te-select-init
              data-te-select-filter="true"
              onChange={(e) => { 
                updateFilters({region: Number(e.target.value) || 'todas', city: 'todas'});
              }}
            >
              <option value={"todas"}>Todas</option>
              {regiones.map((item) => (
                <option key={'regions-'+item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label data-te-select-label-ref>Región</label>
          </div>
        </div>
        <div
          className="relative inline-block"
        >
          <select data-te-select-init data-te-select-filter="true"
            onChange={ event => 
              updateFilters({city:Number(event.target.value) || 'todas'})
            }
            value={filters.city}
          >
            <option key={'comunna-all'} value={'todas'}>
                Todas
            </option>
            {currentComunas.length >= 1 &&
              currentComunas.map((item, index) => (
                <option key={'comunas-'+item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <label data-te-select-label-ref>Comuna</label>
        </div>
        <div
          className="relative inline-block"
        >
          <select data-te-select-init data-te-select-filter="true"
          onChange={event => updateFilters({category: Number(event.target.value) || 'todas'  })}
          >
            <option value={"todas"}>Todas</option>
            {categorias.map((item, index) => (
              <option key={'category-'+ item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label data-te-select-label-ref>Categoría</label>
        </div>
        <button
          type="button"
          onClick={() => filterOnClick()}
          className={`hidden sm:ml-4 md:ml-0 sm:block bg-secondary rounded lg:px-10 pb-2 pt-2.5 text-md text-white hover:bg-yellow hover:text-primary transition duration-150 ease-in-out sm:px-4`}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filters;