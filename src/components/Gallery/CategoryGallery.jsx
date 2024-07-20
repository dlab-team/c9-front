import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from '../UI';
import PublicationCard from './PublicationCard';

const CategoryGallery = () => {
  const { categoryId } = useParams();
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications/category/${categoryId}`;

  const getPublicationsData = async () => {
    try {
      const response = await axios.get(`${endpoint}?page=${page}`);
      const { publications: newPublications } = response.data;
      setPublications((prevPublications) => {
        const existingIds = prevPublications.map((pub) => pub.id);
        const filteredPublications = newPublications.filter(
          (pub) => !existingIds.includes(pub.id)
        );
        return [...prevPublications, ...filteredPublications];
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPublicationsData();
  }, [page, categoryId]);

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

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[20vh] sm:h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {publications.length > 0 ? (
            <>
            <h1 className="innova-heading text-center text-3xl font-bold text-blue-800 my-10">Resultados para la categoría:  {publications[0].category.name}</h1>
            <div className="grid grid-cols-3 gap-6 mt-5">
              {publications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  className={`${
                    index === 0
                      ? 'col-span-3 lg:col-span-2'
                      : 'lg:col-span-1 max-lg:hidden'
                  }`}
                />
              ))}
            </div>
            </>
          ) : (
            <h3 className="innova-heading text-center text-3xl font-bold text-blue-800 my-10">
              No se encontraron resultados para esta categoría
            </h3>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryGallery;
