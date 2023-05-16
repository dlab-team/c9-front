import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Searching.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../assets/images/back_img.png";


const Searching = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Realizar búsqueda:", searchTerm);
    //test para revisar si esta funcionando el search desde el icono
  };

  return (
    <div className="container mt-12 flex flex-col justify-center items-center">
      <Link to="/">
          <button
            type="button"
            className="btn_back_searching text-blue-800 text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Volver
          </button>
        </Link>
      <h1 className="mb-4 text-center">    
        ¿Qué noticias vamos a encontrar hoy?
      </h1>
      <div className="relative mt-10">
        <input
          type="text"
          className="py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar noticias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      
      
      <img className="back_image_one" src={backgroundImage} alt="" />
      <img className="back_image_two" src={backgroundImage} alt="" />
    </div>
  );
};

export default Searching;

//   style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'bottom', backgroundSize: 'cover' }}
