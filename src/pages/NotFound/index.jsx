import React from "react";
import { useMediaQuery } from "react-responsive";
import backgroundImage from "./background/bg_cat404.png";
import "./background/NotFound.css"; // Importar el archivo CSS donde se definirá la clase personalizada

const NotFound = () => {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 767px)"
  });

  const textSizeClass = isSmallScreen ? "text-xl" : "text-4xl";

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-opacity"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-white text-center mb-8 px-4 custom-text mb-24">
        <p className="block mb-8 text-9xl fade-in">¡Ups!</p>
      </div>
      <div className={`flex flex-col items-center justify-center ${isSmallScreen ? "" : "mt-24"}`}>
        <p className={`text-white text-center mb-4 px-4 custom-text ${textSizeClass} fade-in slide-up`}>
          Parece que el michi programador aún no ha terminado esta página.
        </p>
        <p className={`text-white text-center mb-8 px-4 custom-text ${textSizeClass} fade-in slide-up`}>
          ¿Por qué no lo dejamos en paz y seguimos divirtiéndonos con las
          otras noticias del sitio?
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fade-in slide-up"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};
export default NotFound;
