import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Filters } from '../../components';
import axios from 'axios';

function formatoFecha(fecha) {
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);

  const partesFecha = fechaFormateada.split(' de ');
  const dia = partesFecha[0];
  const mesYAnio = partesFecha[1] + ' ' + partesFecha[2];

  return dia + ' ' + mesYAnio;
}

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;
  // Define el ancho máximo para considerar la pantalla como pequeña
const isSmallScreen = useMediaQuery({ maxWidth: 640 }); 
  const getPublicationsData = async () => {
    try {
      const response = await axios.get(`${endpoint}?page=${page}`);
      const { publications } = response.data;

      setPublications(prevPublications => [...prevPublications, ...publications]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationsData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isBottom) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Filters />
      <div className={`columns-2 sm:columns-2 lg:columns-3 gap-6 container mx-auto`}>
        {publications.map((publication) => (
          <div
            className={`cursor-pointer block max-h-100 rounded-2xl overflow-hidden border border-gray-200 mb-5 shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/40`}
            key={publication.id}
            onClick={() => navigate(`/noticias/${publication.slug}`)}
          >
            <img
              className={`w-full ${isSmallScreen ? 'h-48' : 'max-h-96'} object-cover object-center rounded-t-lg transition duration-300 ease-in-out hover:opacity-60`}
              src={
                publication?.images[0]?.url ||
                `https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 1000) + 1}`
              }
              alt={publication.name}
            />
            <div className={`px-4 py-2 text-left`}>
              <h1 className={`text-xl leading-[1.2] text-md ${isSmallScreen ? 'text-sm' : ''}`}>
                {publication.name}
              </h1>
              {!isSmallScreen && ( // Condición para mostrar la fecha solo en pantallas grandes
                <p className={`card-date font-thin text-xs py-4`}>
                  Creado el {formatoFecha(publication.publicationDate)}
                </p>
              )}
              {!isSmallScreen && ( // Condición para mostrar el contenido solo en pantallas grandes
                <p className={`text-[0.85rem] font-thin`}>
                  {publication.finalContent.split(' ').slice(0, 15).join(' ') + '...'}
                </p>
              )}
            </div>
            <div className={`px-4 py-4`}>
              <p className={`text-xs`}>@{publication.author}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
