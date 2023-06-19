import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Select, initTE } from "tw-elements";
import axios from "axios";

// TODO: traer esta data desde el back

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Filters = () => {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isComunaOpen, setIsComunaOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [regiones, setRegiones] = useState([]);

  const regionDropdownRef = useRef(null);
  const comunaDropdownRef = useRef(null);
  const categoriaDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      regionDropdownRef.current &&
      !regionDropdownRef.current.contains(event.target)
    ) {
      setIsRegionOpen(false);
    }
    if (
      comunaDropdownRef.current &&
      !comunaDropdownRef.current.contains(event.target)
    ) {
      setIsComunaOpen(false);
    }
    if (
      categoriaDropdownRef.current &&
      !categoriaDropdownRef.current.contains(event.target)
    ) {
      setIsCategoriaOpen(false);
    }
  };

  const toggleRegionDropdown = () => {
    setIsRegionOpen(!isRegionOpen);
  };

  const toggleComunaDropdown = () => {
    setIsComunaOpen(!isComunaOpen);
  };

  const toggleCategoriaDropdown = () => {
    setIsCategoriaOpen(!isCategoriaOpen);
  };

  const [currentRegion, setCurrentRegion] = useState("Todas");
  const [currentComunas, setCurrentComunas] = useState("");

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
  }, [currentRegion]);

  const loadComunas = () => {
    const index = regiones.findIndex((region) => region.name === currentRegion);
    const comunas = regiones[index]?.cities;
    setCurrentComunas(comunas);
  };
  return (
    <div className="mb-[2em] p-0 sm:gap-4 container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
      <div className="flex mt-2 gap-2">
        <button type="button" className="sm:hidden flex items-center mr-2">
          <FontAwesomeIcon icon={faFilter} className="text-secondary h-6" />
        </button>
        <div
          className="relative inline-block"
          ref={regionDropdownRef}
          data-te-dropdown-ref
        >
          <div className="relative inline-blockrounded-lg">
            <select
              data-te-select-init
              data-te-select-filter="true"
              onChange={(e) => {
                setCurrentRegion(e.target.value);
              }}
            >
              <option value={"todas"}>Todas</option>
              {regiones.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label data-te-select-label-ref>Región</label>
          </div>
        </div>
        <div
          className="relative inline-block"
          ref={comunaDropdownRef}
          data-te-dropdown-ref
        >
          <select data-te-select-init data-te-select-filter="true">
            <option value={"todas"}>Todas</option>
            {currentComunas &&
              currentComunas.map((item, id) => (
                <option key={id} value={id}>
                  {item.name}
                </option>
              ))}
          </select>
          <label data-te-select-label-ref>Comuna</label>
        </div>
        <div
          className="relative inline-block"
          ref={categoriaDropdownRef}
          data-te-dropdown-ref
        >
          <select data-te-select-init data-te-select-filter="true">
            <option value={"todas"}>Todas</option>
            {categorias.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label data-te-select-label-ref>Categoría</label>
        </div>
        <button
          type="button"
          className={`hidden sm:ml-4 md:ml-0 sm:block bg-secondary rounded lg:px-10 pb-2 pt-2.5 text-md text-white hover:bg-yellow hover:text-primary transition duration-150 ease-in-out sm:px-4`}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filters;
