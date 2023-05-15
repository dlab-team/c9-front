import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Gallery.module.css';
import { Filters } from '../../components';
import axios from 'axios';

const Gallery = () => {
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;

  const getPublicationsData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publications } = response.data;

      console.log(publications);

      setPublications(publications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPublicationsData();
  }, []);

  return (
    <>
      <Filters />
      <div
        className={`${styles.gallery} mb-4 sm : columns-1 w-screen md:columns-2 lg:columns-3 container`}
      >
        <div className="gap-4">
          {publications.map((publication) => (
            <div
              style={{ margin: '10' }}
              className="cursor-pointer block max-h-100 rounded-2xl overflow-hidden border border-gray-200 mb-3 bg-white shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/20"
              key={publication.id}
              onClick={() => navigate(`/noticias/${publication.slug}`)}
            >
              <img
                className="max-h-96 w-full h-full object-cover object-center rounded-t-lg  transition duration-300 ease-in-out hover:opacity-70"
                src={publication.images[0].url}
                alt={publication.name}
              />
              <div className="px-4 py-3 leading-normal text-left">
                <h1 className="text-md font-bold pb-3">{publication.name}</h1>
                <p className="card-date font-thin text-xs pb-2">
                  Creado {publication.publicationDate}
                </p>
                <p className={`${styles.cardText} text-xs font-thin`}>
                  {publication.finalContent.substring(0, 50)}...
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm leading-normal">@{publication.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
