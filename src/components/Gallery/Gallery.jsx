import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Filters } from '../../components';
import axios from 'axios';
import { normalizeSync } from 'normalize-diacritics';
import { Spinner } from '../UI';
import { FiltersContext } from '../../context/FiltersContext';

function formatoFecha(fecha) {
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);

  const partesFecha = fechaFormateada.split(' de ');
  const dia = partesFecha[0];
  const mesYAnio = partesFecha[1] + ' ' + partesFecha[2];

  return dia + ' ' + mesYAnio;
}

function normalizeName(name) {
  //Remove accents
  return normalizeSync(name.toLowerCase());
}

const filterPublicationsBySearh = (publications, searchValue) => {
  const searchValueNormalized = normalizeName(searchValue);
  const filteredPublications = publications.filter((pub) => {
    const publicationNameNormalized = normalizeName(pub.name);
    return publicationNameNormalized.includes(searchValueNormalized);
  });
  return filteredPublications;
};

const Gallery = ({ searchValue = '' }) => {
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const [ filteredPublications , setFilteredPublications] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const { filterPublications} = useContext(FiltersContext)
  const navigate = useNavigate();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;
  // Define el ancho máximo para considerar la pantalla como pequeña
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const getPublicationsData = async () => {
    try {
      const response = await axios.get(`${endpoint}?page=${page}`);
      const { publications } = response.data;

      setPublications((prevPublications) => {
        const existingIds = prevPublications.map((pub) => pub.id);
        const filteredPublications = publications.filter(
          (pub) => !existingIds.includes(pub.id)
        );
        return [...prevPublications, ...filteredPublications];
      });
      setIsloading(false);
    } catch (error) {
      console.error(error);
    }
    //   setPublications(prevPublications => [...prevPublications, ...publications]);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getPublicationsData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isBottom) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filterOnClick = () => {
    const filteredPublication = filterPublications(publications);
    setFilteredPublications(filteredPublication);
  }

  const filteredPublicationsBySearch =
    searchValue.length > 0
      ? filterPublicationsBySearh(publications, searchValue)
      : publications;
  
  const publicationsToRender = (filteredPublications && searchValue === '')
    ? filteredPublications : filteredPublicationsBySearch;
  
  // Variable para almacenar el número total de publicaciones existentes
  const totalPublications = publications.length;

  // Variable para almacenar el número de elementos encontrados en la búsqueda
  const numResults = filteredPublicationsBySearch.length;


  return (
    <>
      {isloading && (
        <div className="w-full h-[20vh] sm:h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isloading && (
        <div>
          {searchValue || searchValue !== '' ? (
            <>
            <h1 className="innova-heading text-center text-3xl font-bold text-blue-800 my-5">
              {filteredPublicationsBySearch.length > 0
                ? `Resultados para la búsqueda: ${searchValue}`
                : `No se encontraron resultados para la búsqueda: ${searchValue}`}
            </h1>
            <h3 className="reasultsStatistics text-secondary">
              {filteredPublicationsBySearch.length > 0
                ? `${numResults} de ${totalPublications} publicaciones`
                : ''
              }
            </h3>
            </>
          ) : (
            <Filters filterOnClick={filterOnClick} />
          )}
          
          {/* <div className="columns-2 sm:columns-2 lg:columns-3 gap-6 container mx-auto"> */}
          {/* <div className={`gap-6 container mx-auto`}> */}
          <div
            className={`${
              searchValue !== ''
                ? 'gap-6 container mx-auto'
                : 'columns-2 sm:columns-2 lg:columns-3 gap-6 container mx-auto'
            }`}
          >
            {publicationsToRender.map((publication) => (
              <React.Fragment key={publication.id}>
                {searchValue !== '' ? (
                  <div
                    key={publication.id}
                    className="bg-gray-100 border p-3 my-3 rounded-lg shadow-lg flex cursor-pointer hover:shadow-xl hover:shadow-black/20 duration-300"
                    onClick={() => navigate(`/noticias/${publication.slug}`)}
                  >
                    <img
                      className={`object-cover object-center rounded-lg w-[200px] transition duration-300 ease-in-out hover:opacity-60`}
                      src={
                        (publication?.images && publication?.images[0]?.url) ||
                        `https://picsum.photos/1200/800?random=${
                          Math.floor(Math.random() * 1000) + 1
                        }`
                      }
                      alt={publication.name}
                    />
                    <div className="ms-5">
                      <div>{formatoFecha(publication.publicationDate)}</div>
                      <h1 className="text-xl font-bold">{publication.name}</h1>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            publication.finalContent
                              .split(' ')
                              .slice(0, 15)
                              .join(' ') + '...',
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`cursor-pointer block max-h-100 rounded-2xl overflow-hidden border border-gray-200 mb-5 shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/40`}
                    key={publication.id}
                    onClick={() => navigate(`/noticias/${publication.slug}`)}
                  >
                    <img
                      className={`w-full ${
                        isSmallScreen ? 'h-48' : 'max-h-96'
                      } object-cover object-center rounded-t-lg transition duration-300 ease-in-out hover:opacity-60`}
                      src={
                        (publication?.images && publication?.images[0]?.url) ||
                        `https://picsum.photos/1200/800?random=${
                          Math.floor(Math.random() * 1000) + 1
                        }`
                      }
                      alt={publication.name}
                    />
                    <div className={`px-4 py-2 text-left`}>
                      <h1
                        className={`text-xl leading-[1.2] text-md ${
                          isSmallScreen ? 'text-sm' : ''
                        }`}
                      >
                        {publication.name}
                      </h1>
                      {!isSmallScreen && ( // Condición para mostrar la fecha solo en pantallas grandes
                        <p className={`card-date font-thin text-xs py-4`}>
                          Creado el {formatoFecha(publication.publicationDate)}
                        </p>
                      )}
                      {!isSmallScreen && ( // Condición para mostrar el contenido solo en pantallas grandes
                        <p
                          className={`text-[0.85rem] font-thin`}
                          dangerouslySetInnerHTML={{
                            __html:
                              publication.finalContent
                                .split(' ')
                                .slice(0, 15)
                                .join(' ') + '...',
                          }}
                        ></p>
                      )}
                    </div>
                    <div className={`px-4 py-4`}>
                      <p className={`text-xs`}>@{publication.author}</p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
