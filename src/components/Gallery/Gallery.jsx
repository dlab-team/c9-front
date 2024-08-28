import React, { useState, useEffect, useContext } from 'react';
import { Filters } from '../../components';
import axios from 'axios';
import { normalizeSync } from 'normalize-diacritics';
import { Spinner } from '../UI';
import { FiltersContext } from '../../context/FiltersContext';
import PublicationCard from './PublicationCard';
import PublicationCardForSearch from './PublicationCardForSearch';

function normalizeName(name) {
  //Remove accents
  return normalizeSync(name.toLowerCase());
}

export const filterPublicationsBySearh = (publications, searchValue) => {
  const searchValueNormalized = normalizeName(searchValue);
  const filteredPublications = publications.filter((pub) => {
    const publicationNameNormalized = normalizeName(pub.name);
    return publicationNameNormalized.includes(searchValueNormalized);
  });
  return filteredPublications;
};

const filterPublicationsByKeyword = (publications, searchValue) => {
  const searchValueNormalized = normalizeName(searchValue);
  const filteredPublications = publications.filter((pub) => {
    return pub.keywords.some((keyword) => {
      const keywordNormalized = normalizeName(keyword);
      return keywordNormalized.includes(searchValueNormalized);
    });
  });
  return filteredPublications;
};

const Gallery = ({ searchValue = '', keyword = '' }) => {
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const { filterPublications } = useContext(FiltersContext);

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;

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
  };

  const filteredPublicationsBySearch =
    searchValue.length > 0
      ? filterPublicationsBySearh(publications, searchValue)
      : publications;

  const publicationsToRender =
    filteredPublications && searchValue === ''
      ? filteredPublications
      : keyword && keyword.length > 0
      ? filterPublicationsByKeyword(publications, keyword)
      : filteredPublicationsBySearch;

  // Variable para almacenar el número total de publicaciones existentes
  const totalPublications = publications.length;

  // Variable para almacenar el número de elementos encontrados en la búsqueda
  const numResults = publicationsToRender.length;
  return (
    <>
      {isloading && (
        <div className="w-full h-[20vh] sm:h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isloading && (
        <div>
          {searchValue || searchValue !== '' || keyword ? (
            <>
              <h1 className="innova-heading text-center text-3xl font-bold text-blue-800 my-5">
                {filteredPublicationsBySearch.length > 0
                  ? `Resultados para la búsqueda: ${searchValue}`
                  : `No se encontraron resultados para la búsqueda: ${searchValue}`}
              </h1>
              <h3 className="reasultsStatistics text-secondary">
                {filteredPublicationsBySearch.length > 0
                  ? `${numResults} de ${totalPublications} publicaciones`
                  : ''}
              </h3>
            </>
          ) : (
            <Filters filterOnClick={filterOnClick} />
          )}

          {/* <div className="columns-2 sm:columns-2 lg:columns-3 gap-6 container mx-auto"> */}
          {/* <div className={`gap-6 container mx-auto`}> */}
          {filteredPublications?.length > 0 && (
            <h3 className="reasultsStatistics text-secondary mb-4">
              {filteredPublicationsBySearch.length > 0
                ? `${numResults} de ${totalPublications} publicaciones`
                : ''}
            </h3>
          )}
          {filteredPublications?.length === 0 && (
            <h3 className="reasultsStatistics text-xl text-secondary mb-4">
              No se encontraron resultados para los filtros aplicados
            </h3>
          )}

          <div
            className={`${
              searchValue !== ''
                ? 'gap-6 container mx-auto'
                : 'grid grid-cols-3 gap-6'
            } `}
          >
            {publicationsToRender.slice(0, 2).map((publication, index) => {
              if (searchValue !== '') {
                return (
                  <PublicationCardForSearch
                    publication={publication}
                    key={publication.id}
                  />
                );
              }
              return (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  heigth='h-96'
                  className={`${
                    index === 0
                      ? 'col-span-3 lg:col-span-2'
                      : 'lg:col-span-1 max-lg:hidden'
                  }`}
                />
              );
            })}
          </div>

          <div
            className={`${
              searchValue !== ''
                ? 'gap-6 container mx-auto'
                : 'grid grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto mb-10'
            }`}
          >
            {publicationsToRender
              .slice(1)
              .map((publication, index) =>
                searchValue !== '' ? (
                  <PublicationCardForSearch
                    key={publication.id}
                    publication={publication}
                    className={`${index === 0 ? 'hidden' : ''}`}
                  />
                ) : (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    heigth='h-56'
                    className={`${index === 0 ? 'lg:hidden' : ''}`}
                  />
                )
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
