import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Gallery.module.css';
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
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/publications`;

  const getPublicationsData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { publications } = response.data;

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
        className={`${styles.gallery} columns-2 w-screen md:columns-3 lg:columns-3 container`}
      >
        <div className="gap-4">
          {publications.map((publication) => (
            <div
              style={{ margin: '10' }}
              className="cursor-pointer block max-h-100 rounded-2xl overflow-hidden border border-gray-200 mb-3 bg-gray shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/40"
              key={publication.id}
              onClick={() => navigate(`/noticias/${publication.slug}`)}
            >
              <img
                className="max-h-96 w-full h-full object-cover object-center rounded-t-lg  transition duration-300 ease-in-out hover:opacity-50"
                src={publication.images[0].url}
                alt={publication.name}
              />
              <div className="px-5 py-2 text-left">
                <h1 className="text-xl leading-[1.5] text-md">
                  {publication.name}
                </h1>
                <p className="card-date font-thin text-xs py-4">
                  Creado el {formatoFecha(publication.publicationDate)}
                </p>
                <p className={`text-[0.85rem] font-thin`}>
                  {publication.finalContent.split(' ').slice(0, 12).join(' ') +
                    '...'}
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs">@{publication.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
